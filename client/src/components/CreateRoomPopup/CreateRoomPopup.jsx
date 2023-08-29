import { useState } from "react"
import { useChatContext } from "../../context/ChatContext"

function CreateRoomPopup({ onClose }) {
  const [newRoom, setNewRoom] = useState("")
  const { createRoom, joinRoom } = useChatContext()

  const handleCreateRoom = () => {
    if (newRoom.trim() !== "") {
      createRoom(newRoom)
      joinRoom(newRoom)
      onClose()
    }
  }

  console.log(newRoom);
  return (
    <div className="flex flex-col items-center justify-center fixed inset-0 z-50">
      <div className="bg-gray-500 rounded-lg p-4 ml-36">
        <h1 className="text-center mb-2">Create Room</h1>
        <input
          type="text"
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          className="text-black p-1 border border-gray-300 mb-2 w-60"
        />
        <div className="flex justify-center gap-2">
        <button
          onClick={handleCreateRoom}
          className="bg-green-500 text-sm text-white px-4 py-1"
        >
          Create
        </button>
        <button
          onClick={onClose}
          className="bg-gray-600 text-sm text-white px-4 py-1"
        >
          Close
        </button>
        </div>
      </div>
    </div>
  )
  }
  
  export default CreateRoomPopup