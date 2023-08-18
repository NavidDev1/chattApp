import { useParams } from "react-router-dom"
const Lobby = () => {
  // En unik lobby ID skapad av användare
  const { id } = useParams()
  return (
    <div>Lobby { id }</div>
  )
}

export default Lobby