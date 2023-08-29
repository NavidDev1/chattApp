import { useChatContext } from "../context/ChatContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const StartPage = () => {
  const { username, setUsername, connectToChat } = useChatContext()
  const navigate = useNavigate()
  const [message, setMessage] = useState("")

  const handleUsernameInput = (e) => {
    setMessage("")
    setUsername(e.target.value)
  }

  const handleClick = () => {
    if (username.length === 0) {
      setMessage("You must enter a name to continue.")
      return
    }
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
        <input 
          className="bg-gray-200 w-full p-2 text-center text-lg outline-none" 
          type="text"
          placeholder="Name" 
          onChange={handleUsernameInput} />
         {message && <span className="bg-red-500 p-1 text-sm inline-block mt-2 w-full text-center text-white">{message}</span>}
      </div>
      {<button onClick={handleClick} className="bg-blue-400 text-white
     py-2 px-4 font-bold hover:animate-pulse">Connect</button>}
    </div>
    </div>
  )
}

export default StartPage