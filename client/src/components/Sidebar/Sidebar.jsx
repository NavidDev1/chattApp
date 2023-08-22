import { useChatContext } from "../../context/ChatContext"
import Room from "../Room/Room"

function Sidebar() {
  const { currentRoom, roomsList, joinRoom } = useChatContext()
    return (
      <div className="bg-slate-400 w-1/6">
        <h1 className="text-4xl font-bold pb-8">Rooms:</h1>
        {/* <div>{currentRoom}</div> */}
        <ul>
          {roomsList.map((room) => (
            <li className={room === currentRoom ? "text-green-400" : "cursor-pointer"} key={room} onClick={() => joinRoom(room)}>{room}</li>
          ))}
        </ul>
        {/* <Room /> */}
      </div>
    )
  }
  
  export default Sidebar