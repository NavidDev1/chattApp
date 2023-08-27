import { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client"

const socket = io("http://localhost:3000/", { autoConnect: false })

const ChatContext = createContext()

export const useChatContext = () => useContext(ChatContext)




const ChatProvider = ({ children }) => {
  //setting the diffrent state.
  const [username, setUsername] = useState("")
  const [roomsList, setRoomsList] = useState([])
  const [currentRoom, setCurrentRoom] = useState("Lobby")
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [usersInRooms, setUsersInRooms] = useState({});

  // console.log(typingUsers);


  const connectToChat = () => {
    if (username) {
      socket.connect()
      joinRoom(currentRoom)
    } else {
      console.log("No username");
    }
  }

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    // Listen for "message" events from the socket and update the messages state
  }, [])

  useEffect(() => {
    socket.on("user_typing", (data) => {
      setTypingUsers((prevTypingUsers) => ({
        ...prevTypingUsers,
        [data.room]: [...(prevTypingUsers[data.room] || []), data.username],
      }));
    });

    socket.on("user_stopped_typing", (data) => {
      setTypingUsers((prevTypingUsers) => ({
        ...prevTypingUsers,
        [data.room]: prevTypingUsers[data.room]?.filter((username) => username !== data.username),
      }));
    });
  }, []);

  // Function to send a message using the socket, here we send an object so that we can retirve username.
  const sendMessage = (message) => {
    if (message.trim() !== "") {
      const messageData = {
        username: username,
        content: message,
        room: currentRoom,
        timestamp: new Date().toISOString()
      };
      socket.emit("message", messageData);
    }
  };

  useEffect(() => {
    socket.emit("setUsername", username, (acknowledgmentData) => {
      if (acknowledgmentData.success) {
        console.log("Username set successfully.");
      } else {
        console.error("Failed to set username:", acknowledgmentData.error);
      }
    });
  }, [username]);

  useEffect(() => {
    const handleUsersInRoom = (users) => {
      setUsersInRoom(users);
    };
    socket.on("users_in_room", handleUsersInRoom);

    return () => {
      socket.off("users_in_room", handleUsersInRoom);
    };
  }, []);


  // Connection handler
  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket connected");
    };

    socket.on("connect", handleConnect);

    // Cleanup listener on unmount
    return () => {
      socket.off("connect", handleConnect);
    };
  }, []);

  // Fetch users in rooms
  useEffect(() => {
    const fetchUsersInRooms = () => {
      socket.emit("get_users_in_rooms", (roomsWithUsers) => {
        console.log(roomsWithUsers);
        setUsersInRooms(roomsWithUsers);
      });
    };

    fetchUsersInRooms();

    socket.on("room_changed", fetchUsersInRooms); // Assuming the server emits this event when rooms change. If not, adjust accordingly.

    // Cleanup
    return () => {
      socket.off("room_changed", fetchUsersInRooms);
    };
  }, [currentRoom]); // Dependencies





  const joinRoom = (room) => {
    if (room !== currentRoom) {
      socket.emit("leave_room", currentRoom)
    }
    socket.emit("join_room", room)
    setCurrentRoom(room)
  }

  const createRoom = (room) => {
    socket.emit("create_room", room)
  }

  useEffect(() => {
    socket.on("list_of_rooms", (rooms) => {
      setRoomsList(rooms)
    })
  }, [])

  // console.log("Roomlist:", roomsList);

  // The value to provide through the context
  const chatContextValue = {
    messages,
    sendMessage,
    username,
    setUsername,
    connectToChat,
    createRoom,
    joinRoom,
    currentRoom,
    setCurrentRoom,
    roomsList,
    setRoomsList,
    typingUsers,
    socket,
    usersInRooms
  };

  return (<ChatContext.Provider value={chatContextValue}>
    {children}
  </ChatContext.Provider>)
}

export default ChatProvider