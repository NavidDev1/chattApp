import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import StartPage from "./pages/StartPage"
import Main from './components/Main/Main'
import { useChatContext } from './context/ChatContext'

function App() {
  const {username} = useChatContext()

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/lobby" element={username ? <Main /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
