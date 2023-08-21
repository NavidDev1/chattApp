import { createContext, useState, useContext } from "react";
import { io } from "socket.io-client"

export const ChatContext = createContext()

const socket = io("http://localhost:3000/", { autoConnect: false })
export const useChatContext = () => useContext(ChatContext)

const ChatProvider = ({ children }) => {
    const [username, setUsername] = useState("")
    const [roomsList, setRoomsList] = useState([])
    const [currentRoom, setCurrentRoom] = useState("")


    return (<ChatContext.Provider value={{ username, setUsername }}>
        {children}
    </ChatContext.Provider>)
}

export default ChatProvider