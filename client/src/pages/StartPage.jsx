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
    <div className="h-screen flex">
      <div className="bg-white shadow-2xl rounded-md flex flex-col justify-center items-center space-y-4 w-3/5 m-auto p-10">
      <h1 className="text-3xl">Hello 👋</h1>
      <div>
        <p className="text-center mb-2">Choose a name</p>
        <input className="bg-gray-200 w-full p-2 text-center text-lg" type="text" placeholder="Name" onChange={(e) => setUsername(e.target.value)}/>
      </div>
      {<button onClick={handleClick} className="bg-blue-400 text-white
     py-2 px-4 font-bold">Connect</button>}
    </div>
    </div>
  )
}

export default StartPage