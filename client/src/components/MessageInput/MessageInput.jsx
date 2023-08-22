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
      <div>
        <input type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)} 
        />
        <button onClick={handleSendMessage}> Send </button>
        <SendMessageBtn />
      </div>
    )
  }
  
  export default MessageInput