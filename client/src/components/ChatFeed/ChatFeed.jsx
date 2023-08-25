import React, { useEffect, useRef } from "react";
import { useChatContext } from "../../context/ChatContext";
import MessageInput from "../MessageInput/MessageInput";

function ChatFeed() {
  const { messages, username, currentRoom } = useChatContext();

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

  return (
    <div className="bg-gray-100 h-auto relative">
      <h2 className="text-sm text-center mb-4 bg-white p-2 sticky top-0">
        Skriv ett meddelande {username} 💬
      </h2>
      <div className="space-y-2 overflow-y-auto">
        {filteredMessages.map((message, index) => (
          <div
            key={index}
            className="flex flex-col text-xs items-start space-x-2 space-y-2"
          >
            <div className="bg-white p-3 rounded-md shadow-md">
              {message.content}
            </div>
            <div className="text-gray-500">
              {message.username}
              <span className="ml-2">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messageContainerRef} />
      </div>
      <MessageInput />
    </div>
  );
}

export default ChatFeed;
