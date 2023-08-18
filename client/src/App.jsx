import './App.css'
import { io } from "socket.io-client"
import { useEffect } from "react"
import {BrowserRouter, Router, Routes, Route} from "react-router-dom"
import Header from './components/Header/Header'
import HomePage from "./pages/HomePage"
import Lobby from "./pages/Lobby"
import CreateRoom from "./pages/CreateRoom"
import AllRooms from "./pages/AllRooms"

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
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/lobby/:id" element={<Lobby />} />
          <Route path="/create_room" element={<CreateRoom />} />
          <Route path="/all_rooms" element={<AllRooms />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

{/* <Main />
<MessageInput />
<StartPage /> */}

export default App
