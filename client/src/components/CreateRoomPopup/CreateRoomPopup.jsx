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
      <div className="bg-slate-500 flex flex-col items-center justify-center gap-2 absolute w-96 h-60 top-0 right-0 m-40">
        <h1>Create Room</h1>
        <input type="text" value={newRoom} onChange={(e) => setNewRoom(e.target.value)} className="text-black"/>
        <button onClick={handleCreateRoom}>Create</button>
        <button onClick={onClose}>Close</button>
      </div>
    )
  }
  
  export default CreateRoomPopup