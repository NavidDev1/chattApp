import { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000/", { autoConnect: false });

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

const ChatProvider = ({ children }) => {
  //setting the diffrent state.
  const [username, setUsername] = useState("");
  const [roomsList, setRoomsList] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("Lobby");
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [usersInRooms, setUsersInRooms] = useState({});
  console.log(typingUsers);
  console.log("Users in rooms", usersInRooms);

  const connectToChat = () => {
    if (username) {
      socket.emit("set_username", username);
      socket.connect();
      joinRoom(currentRoom);
    } else {
      console.log("No username");
    }
  };
  // function for updating user in the room.
  useEffect(() => {
    socket.on("update_users_in_room", (room, updatedUsers) => {
      setUsersInRooms((prevUsersInRooms) => ({
        ...prevUsersInRooms,
        [room]: updatedUsers,
      }));
    });
  }, []);

  // Listen for "message" events from the socket and update the messages state
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  //  for showing if the user is typing a message, or have stopped typing
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
        [data.room]: prevTypingUsers[data.room]?.filter(
          (username) => username !== data.username
        ),
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
        timestamp: new Date().toISOString(),
      };
      socket.emit("message", messageData);
    }
  };

  const joinRoom = (room) => {
    if (room !== currentRoom) {
      socket.emit("leave_room", currentRoom);
    }
    socket.emit("join_room", room);
    setCurrentRoom(room);
  };

  const leaveRoom = (room) => {
    socket.emit("leave_room", room);
  };

  // Leaving room on page refresh
  useEffect(() => {
    const handleUnload = (event) => {
      leaveRoom(currentRoom);
    };

    window.addEventListener("beforeunload", handleUnload);
  }, []);

  const createRoom = (room) => {
    socket.emit("create_room", room);
  };

  useEffect(() => {
    socket.on("list_of_rooms", (rooms) => {
      setRoomsList(rooms);
    });
  }, []);

  console.log("Roomlist:", roomsList);

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
    usersInRooms,
    leaveRoom,
  };

  return (
    // Here we are wrapping the childrens with the context provider.
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
