import SendMessageBtn from "../SendMessageBtn/SendMessageBtn"
import { useChatContext } from "../../context/ChatContext"
import { useState } from "react"


function MessageInput() {
  const [newMessage, setNewMessage] = useState("");
  const {sendMessage, username, currentRoom, typingUsers, socket} = useChatContext();
  const uniqueTypingUsers = Array.from(new Set(typingUsers[currentRoom] || []));

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    if (e.target.value !== "") {
      socket.emit("typing_start", { room: currentRoom, username });
    } else {
      socket.emit("typing_end", { room: currentRoom, username });
    }
  };

  const handleSendMessage = () => {
    if(newMessage !== "") {
      sendMessage(newMessage);
      setNewMessage("")
      socket.emit("typing_end", { room: currentRoom, username });
    }
  }

    return (
      <div className="flex border-2 border-solid sticky bottom-0 right-0 left-0 z-100 mt-2">
        <input
        className="p-2 text-sm flex-1" 
        type="text"
        value={newMessage}
        onChange={handleInputChange} 
        />
        <button onClick={handleSendMessage} className="bg-blue-400 text-white p-2 text-sm"> Send </button>
        <div>
        {uniqueTypingUsers.length > 0 && (
          <div>
            {uniqueTypingUsers.join(", ")} {uniqueTypingUsers.length === 1 ? "is" : "are"} typing...
          </div>
        )}
      </div>
        {/* <SendMessageBtn /> */}
      </div>
    )
  }
  
  export default MessageInput