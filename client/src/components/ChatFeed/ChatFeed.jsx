import React, { useEffect, useRef } from "react";
import { useChatContext } from "../../context/ChatContext";
import MessageInput from "../MessageInput/MessageInput";

function ChatFeed() {
  const { messages, username, currentRoom, setRoomsList, usersInRooms } =
    useChatContext();

  const filteredMessages = messages.filter(
    (message) => message.room === currentRoom
  );

  const messagesContainerRef = useRef(null);
  const lastMessageRef = useRef(null);
  const lobbyUsers = usersInRooms["Lobby"];
  //here we make a custom hook to make the dic automatically scroll to bottom of the chatfeed

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  
    // Timeout for scrolling gifs
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  
  }, [filteredMessages]);
  console.log(username);
  return (
    <div className="bg-gray-100 relative flex flex-col h-full">
      <h2 className="text-sm text-center mb-4 bg-white p-2 sticky top-0">
        Users in {currentRoom}: <b className="text-indigo-500">{usersInRooms[currentRoom]?.join(", ")}</b> 💬
      </h2>
      <div className="space-y-2 overflow-y-auto flex-1" ref={messagesContainerRef}>
        {filteredMessages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col text-s space-x-2 space-y-2 animate-fade-down ${username === message.username ? "items-end" : "items-start"
              }`}
            ref={index === filteredMessages.length - 1 ? lastMessageRef : null}

          >
            <div
              className={`p-3 mx-1 rounded-md shadow-md max-w-xs whitespace-normal break-words ${username === message.username
                ? "bg-gray-600 text-white"
                : "bg-indigo-500 text-white"
                }`}
            >
              {message.content.startsWith('http') ? (
                <img src={message.content} alt="GIF" />
              ) : (
                message.content
              )}            
            </div>
            {username === message.username ? (
              <div className="text-gray-400 mb-1 text-xs">
                (
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                )
              </div>
            ) : (
              <div className="text-gray-400 mb-1 text-xs">
                {" "}
                {message.username + " "}(
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                )
              </div>
            )}
          </div>
        ))}
        <div />
      </div>
      <MessageInput className="w-full" />
    </div>
  );
}

export default ChatFeed;
