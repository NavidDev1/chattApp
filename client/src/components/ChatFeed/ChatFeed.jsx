import { useChatContext } from "../../context/ChatContext"
import MessageInput from "../MessageInput/MessageInput";


// we use the chatContext to bring in the messages and username
function ChatFeed() {
const {messages, username} = useChatContext();

console.log(messages)


    return (
      //here we map out the messages 

      <div className="p-4 bg-gray-100">
      <h2 className="text-2xl mb-4">Welcome to the chat {username}!</h2>
      <div className="space-y-2">
        {messages.map((message, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="bg-white p-3 rounded-md shadow-md">
              <strong>{message.username}</strong>
              {message.content}
            </div>
            <div className="text-gray-500">{message.username}</div>
          </div>
        ))}
      </div>
      <div><MessageInput /> </div>
    </div>
  );
 
}
  export default ChatFeed
  