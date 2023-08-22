import { useChatContext } from "../../context/ChatContext"
import MessageInput from "../MessageInput/MessageInput";


// we use the chatContext to bring in the messages and username
function ChatFeed() {
const {messages, username} = useChatContext();

console.log(messages)
    return (
      <div className="bg-gray-100 h-auto relative">
      <h2 className="text-sm text-center mb-4 bg-white p-2 sticky top-0">Skriv ett meddelande {username} 💬</h2>
      <div className="space-y-2">
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col text-xs items-start space-x-2 space-y-2">
            <div className="bg-white p-3 rounded-md shadow-md">
              {message.content}
            </div>
            <div className="text-gray-500">{message.username}</div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
 
}
  export default ChatFeed
  