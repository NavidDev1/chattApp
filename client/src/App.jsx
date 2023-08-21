import './App.css'
import {BrowserRouter, Router, Routes, Route} from "react-router-dom"
import Header from './components/Header/Header'
import StartPage from "./pages/StartPage"
import Lobby from "./pages/Lobby"
import CreateRoom from "./pages/CreateRoom"
import AllRooms from "./pages/AllRooms"
import Main from './components/Main/Main'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/lobby" element={<Main />} />
          {/* <Route path="/lobby/:id" element={<Lobby />} />
          <Route path="/create_room" element={<CreateRoom />} />
          <Route path="/all_rooms" element={<AllRooms />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

{/* <Main />
<MessageInput />
<StartPage /> */}

export default App
