import React, { useEffect, useRef } from "react";
import { useChatContext } from "../../context/ChatContext";
import MessageInput from "../MessageInput/MessageInput";

function ChatFeed() {
  const { messages, username, currentRoom, setRoomsList } = useChatContext();

  const filteredMessages = messages.filter(
    (message) => message.room === currentRoom
  );

  const messageContainerRef = useRef(null);

  //here we make a custom hook to make the dic automatically scroll to bottom of the chatfeed
  useEffect(() => {
    const scrollToBottom = () => {
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    };

    scrollToBottom();
  }, [filteredMessages]);
  console.log(username);
  return (
    <div className="bg-gray-100 h-auto relative">
      <h2 className="text-sm text-center mb-4 bg-white p-2 sticky top-0">
        Skriv ett meddelande {username} 💬
      </h2>
      <div className="space-y-2 overflow-y-auto">
        {filteredMessages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col text-xs space-x-2 space-y-2 ${username === message.username ? "items-end" : "items-start"}`}
          >
            <div className={`bg-white p-3 rounded-md shadow-md ${username === message.username ? "text-blue-500 text-right" : ""}`}>
              {message.content}
            </div>
            {username === message.username ?
              <div className="text-gray-500">({new Date(message.timestamp).toLocaleTimeString()}): {message.username}</div>
              : <div className="text-gray-500"> ({new Date(message.timestamp).toLocaleTimeString()}): {message.username}</div>}
          </div>
        ))}
        <div ref={messageContainerRef} />
      </div>
      <MessageInput />
    </div>


  );
}

export default ChatFeed;
