import { useChatContext } from "../../context/ChatContext"
import Room from "../Room/Room"

function Sidebar() {
  const { currentRoom } = useChatContext()
    return (
      <div className="bg-slate-400 w-1/6">
        <div>
          <input type="text" />
          <button className="bg-slate-600">Create Room</button>
        </div>
        <h1 className="text-4xl font-bold pb-8">Rooms:</h1>
        <div>{currentRoom}</div>
        {/* <Room /> */}
      </div>
    )
  }
  
  export default Sidebar