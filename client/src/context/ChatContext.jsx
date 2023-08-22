import { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client"

const ChatContext = createContext()

const socket = io("http://localhost:3000/", { autoConnect: false })
export const useChatContext = () => useContext(ChatContext)

const ChatProvider = ({ children }) => {
    const [username, setUsername] = useState("")
    const [roomsList, setRoomsList] = useState([])
    const [currentRoom, setCurrentRoom] = useState("Lobby")

    const connectToChat = () => {
        if (username) {
            socket.connect()
            joinRoom(currentRoom)
        } else {
            console.log("No username");
        }
    }

    const joinRoom = (room) => {
        socket.emit("join_room", room)
        setCurrentRoom(room)
    }

    useEffect(() => {
        socket.on("list_of_rooms", (rooms) => {
            setRoomsList(rooms)
        })
    }, []) 
    
    console.log("Roomlist:", roomsList);

    return (<ChatContext.Provider value={{ username, setUsername, roomsList, connectToChat, currentRoom, setCurrentRoom }}>
        {children}
    </ChatContext.Provider>)
}

export default ChatProvider