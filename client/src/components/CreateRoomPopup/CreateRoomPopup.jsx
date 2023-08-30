import { useState } from "react";
import { useChatContext } from "../../context/ChatContext";

// creating the room pup up

function CreateRoomPopup({ onClose }) {
  const [newRoom, setNewRoom] = useState("");
  const { createRoom, joinRoom } = useChatContext();

  const handleCreateRoom = () => {
    if (newRoom.trim() !== "") {
      createRoom(newRoom);
      joinRoom(newRoom);
      onClose();
    }
  };

  console.log(newRoom);
  return (
    <div className="flex flex-col items-center justify-center fixed inset-0 z-50">
      <div className="bg-indigo-500 rounded-s p-4 ml-36 animate-jump-in">
        <h1 className="text-center mb-2">Create Room</h1>
        <input
          type="text"
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          className="text-black p-1 border border-gray-300 mb-2 w-60 outline-none"
        />
        <div className="flex justify-center gap-2">
          <button
            onClick={handleCreateRoom}
            className="text-sm text-white px-4 py-1 hover:animate-pulse"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="text-sm text-white px-4 py-1 hover:animate-pulse"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateRoomPopup;
