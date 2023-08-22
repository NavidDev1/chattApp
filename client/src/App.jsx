import './App.css'
import {BrowserRouter, Router, Routes, Route} from "react-router-dom"
import StartPage from "./pages/StartPage"
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
