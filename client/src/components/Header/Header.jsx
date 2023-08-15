import LeaveRoomBtn from "../LeaveRoomBtn/LeaveRoomBtn"
import StartRoomBtn from "../StartRoomBtn/StartRoomBtn"

function Header() {
    return (
      <div>
        <h1>Header</h1>
        <StartRoomBtn />
        <LeaveRoomBtn />
      </div>
    )
  }
  
  export default Header