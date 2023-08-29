import { useState } from "react"
import { useChatContext } from "../../context/ChatContext"
import CreateRoomPopup from "../CreateRoomPopup/CreateRoomPopup"
import { FiUser, FiMessageSquare } from "react-icons/fi"

function Header() {
  const { username } = useChatContext()
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleOpenPopup = () => {
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

    return (
      <div className="flex items-center bg-indigo-500 text-white p-4 justify-between w-full">
        <h1>Chatt</h1>
        {isPopupOpen && <CreateRoomPopup onClose={handleClosePopup}/>}
        <div className="text-sm flex gap-2">
        <button className="flex items-center gap-1" onClick={handleOpenPopup}><FiMessageSquare />Create Room</button>
        <button className="flex items-center gap-1 cursor-default"><FiUser />{username}</button>
        </div>
      </div>
    )
  }
  
  export default Header