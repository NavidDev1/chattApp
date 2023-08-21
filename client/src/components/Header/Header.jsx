import { Link } from "react-router-dom"
import "./Header.css"
import { useChatContext } from "../../context/ChatContext"

function Header() {
  const { username } = useChatContext()

    return (
      <div className="header">
        <h1>Chatt</h1>
        <h1>Welcome {username}</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/lobby">Lobby</Link></li>
          <li><Link to="/create_room">Create Room</Link></li>
          <li><Link to="/all_rooms">All Rooms</Link></li>
        </ul>
      </div>
    )
  }
  
  export default Header