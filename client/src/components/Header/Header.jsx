import { Link } from "react-router-dom"
import { useState } from "react"
import "./Header.css"
import { useChatContext } from "../../context/ChatContext"
import CreateRoomPopup from "../CreateRoomPopup/CreateRoomPopup"

function Header() {
  const { username } = useChatContext()
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleOpenPopup = () => {
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

    return (
      <div className="header">
        <h1>Chatt</h1>
        <h1 className="text-3xl font-bold">Welcome {username}</h1>
        {isPopupOpen && <CreateRoomPopup onClose={handleClosePopup}/>}
        <button onClick={handleOpenPopup}>Create Room</button>
        <Link to="/">Logout</Link>
        {/* <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/lobby">Lobby</Link></li>
          <li><Link to="/create_room">Create Room</Link></li>
          <li><Link to="/all_rooms">All Rooms</Link></li>
        </ul> */}
      </div>
    )
  }
  
  export default Header