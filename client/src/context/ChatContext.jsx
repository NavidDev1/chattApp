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
    

    const connectToChat = () => {
        if (username) {
            socket.connect()
            joinRoom(currentRoom)
        } else {
            console.log("No username");
        }
    }

    useEffect(() => {
      // Listen for "message" events from the socket and update the messages state
      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }, []);
  
    // Function to send a message using the socket, here we send an object so that we can retirve username.
    const sendMessage = (message) => {
      if (message.trim() !== "") {
        const messageData ={
          username: username,
          content: message,
          room: currentRoom
        };
        socket.emit("message", messageData);
      }
    };
  
    
    const joinRoom = (room) => {
        if(room !== currentRoom) {
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
    };

    return (<ChatContext.Provider value={chatContextValue}>
        {children}
    </ChatContext.Provider>)
}

export default ChatProvider