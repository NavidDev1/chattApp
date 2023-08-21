import { useChatContext } from "../context/ChatContext"
import { useNavigate } from "react-router-dom"

const StartPage = () => {
  const { username, setUsername } = useChatContext()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/lobby")
  }

  console.log(username);
  
  return (
    <div>
      <h1>Welcome</h1>
      <div>
        <p>Write your name please...</p>
        <input type="text" placeholder="Name" onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <button onClick={handleClick}>Connect</button>
    </div>
  )
}

export default StartPage