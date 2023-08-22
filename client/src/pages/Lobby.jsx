import { useParams } from "react-router-dom"
import ChatFeed from "../components/ChatFeed/ChatFeed"
const Lobby = () => {
  // En unik lobby ID skapad av användare
  const { id } = useParams()
  return (
    <div> <ChatFeed />
    <div>Lobby { id }</div>
    </div>
    
  )
}

export default Lobby