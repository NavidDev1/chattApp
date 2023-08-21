import { useChatContext } from "../context/ChatContext"
import { useNavigate } from "react-router-dom"

const StartPage = () => {
  const { username, setUsername, connectToChat } = useChatContext()
  const navigate = useNavigate()

  const handleClick = () => {
    connectToChat()
    navigate("/lobby")
  }

  console.log(username);

  return (
    <div className="bg-blue-500 flex flex-col items-center gap-4 w-96 m-auto">
      <h1 className="text-5xl">Welcome</h1>
      <div>
        <p>Write your name please...</p>
        <input type="text" placeholder="Name" onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <button onClick={handleClick} className="bg-slate-300 p-2 border">Connect</button>
    </div>
  )
}

export default StartPage