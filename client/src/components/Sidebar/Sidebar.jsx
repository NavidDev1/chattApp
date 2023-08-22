import { useChatContext } from "../../context/ChatContext"
import { Link } from "react-router-dom"

function Sidebar() {
  const { currentRoom, roomsList, joinRoom } = useChatContext()
    return (
      <div className="relative h-full">
        <h1 className="text-sm text-center mb-2 bg-white p-2 sticky top-0">Rooms:</h1>
        <ul className="p-2">
          {roomsList.map((room) => (
            <li className={room === currentRoom ? "text-gray-900 font-bold text-sm text-center" : "cursor-pointer"} key={room} onClick={() => joinRoom(room)}>🏠 {room}</li>
          ))}
        </ul>
        <Link to="/" className="bg-red-500 text-white text-sm text-center absolute bottom-0 left-0 right-0 p-2">Logga ut</Link>
        {/* <Room /> */}
      </div>
    )
  }
  
  export default Sidebar