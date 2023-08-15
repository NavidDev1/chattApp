import { io } from "socket.io-client"
import './App.css'
import { useEffect } from "react"

function App() {

  const socket = io("http://localhost:3000/", {/*  autoConnect: false */ })

  const initChat = () => {
    socket.connect()
  }

  useEffect(() => {
    socket.on("test", (data) => {
      console.log(data);
    })
  }, [])

  return (
    <div>
      <h1>Welcome to chat</h1>
    </div>
  )
}

export default App
