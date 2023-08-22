import SendMessageBtn from "../SendMessageBtn/SendMessageBtn"
import { useChatContext } from "../../context/ChatContext"
import { useState } from "react"


function MessageInput() {
  const [newMessage, setNewMessage] = useState("");
  const {sendMessage} = useChatContext();

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("")
  }
    return (
      <div className="flex border-2 border-solid sticky bottom-0 right-0 left-0 z-100 mt-2">
        <input
        className="p-2 text-sm flex-1" 
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)} 
        />
        <button className="bg-blue-400 text-white p-2 text-sm" onClick={handleSendMessage}>Send</button>
      </div>
    )
  }
  
  export default MessageInput