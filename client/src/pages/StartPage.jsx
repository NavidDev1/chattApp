import { useChatContext } from "../context/ChatContext"
import { useNavigate } from "react-router-dom"

const StartPage = () => {
  const { username, setUsername, connectToChat } = useChatContext()
  const navigate = useNavigate()

  const handleClick = () => {
    if (username) {
      connectToChat()
      navigate("/lobby")
    } else {
      console.log("Enter your name please!");
    }
  }

  return (
    <div className="bg-blue-500 flex flex-col justify-center items-center gap-4 w-3/5 m-auto py-10 h-screen">
      <h1 className="text-7xl">Welcome</h1>
      <div>
        <p>Write your name please...</p>
        <input type="text" placeholder="Name" onChange={(e) => setUsername(e.target.value)}/>
      </div>
      {<button onClick={handleClick} className="bg-slate-300 p-2 border">Connect</button>}
    </div>
  )
}

export default StartPage