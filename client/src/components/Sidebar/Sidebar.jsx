import { useChatContext } from "../../context/ChatContext"
import Room from "../Room/Room"

function Sidebar() {
  const { currentRoom, roomsList } = useChatContext()
    return (
      <div className="bg-slate-400 w-1/6">
        <h1 className="text-4xl font-bold pb-8">Rooms:</h1>
        {/* <div>{currentRoom}</div> */}
        <ul>
          {roomsList.map((room) => (
            <li key={room}>{room}</li>
          ))}
        </ul>
        {/* <Room /> */}
      </div>
    )
  }
  
  export default Sidebar