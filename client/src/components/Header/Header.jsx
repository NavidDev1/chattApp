import { Link } from "react-router-dom"
import "./Header.css"
import { useChatContext } from "../../context/ChatContext"

function Header() {
  const { username } = useChatContext()

  return (
    <div className="header">

      <h1>Chatt</h1>
      <h1 className="text-3xl font-bold ">Welcome {username}</h1>
      <Link to="/">Logout</Link>


    </div>
  )
}

export default Header
