import React, { useEffect, useRef } from "react";
import { useChatContext } from "../../context/ChatContext";
import MessageInput from "../MessageInput/MessageInput";

function ChatFeed() {
  const { messages, username, currentRoom, setRoomsList, usersInRooms } =
    useChatContext();

  const filteredMessages = messages.filter(
    (message) => message.room === currentRoom
  );

  const lastMessageContainerRef = useRef(null);
  const lobbyUsers = usersInRooms["Lobby"];
  //here we make a custom hook to make the dic automatically scroll to bottom of the chatfeed

  useEffect(() => {
    if (lastMessageContainerRef.current) {
      lastMessageContainerRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [filteredMessages]);
  console.log(username);
  return (
    <div className="bg-gray-100 h-auto relative">
      <h2 className="text-sm text-center mb-4 bg-white p-2 sticky top-0">
        Users in the room: {usersInRooms[currentRoom]?.join(", ")} 💬
      </h2>
      <div className="space-y-2 overflow-y-auto" ref={lastMessageContainerRef}>
        {filteredMessages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col text-s space-x-2 space-y-2 ${
              username === message.username ? "items-end" : "items-start"
            }`}
            ref={
              index === filteredMessages.length - 1
                ? lastMessageContainerRef
                : null
            }
          >
            <div
              className={`p-3 rounded-md shadow-md ${
                username === message.username
                  ? "bg-black text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {message.content}
            </div>
            {username === message.username ? (
              <div className="text-gray-500 mb-1">
                (
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                )
              </div>
            ) : (
              <div className="text-gray-500 mb-1">
                {" "}
                {message.username}(
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
      <MessageInput />
    </div>
  );
}

export default ChatFeed;
