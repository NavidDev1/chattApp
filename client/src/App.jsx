import './App.css'
import { io } from "socket.io-client"
import { useEffect } from "react"
import Header from './components/Header/Header'
import Main from "./components/Main/Main"
import MessageInput from './components/MessageInput/MessageInput'
import StartPage from './components/StartPage/StartPage'

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
      <Header />
      <Main />
      <MessageInput />
      <StartPage />
    </div>
  )
}

export default App
