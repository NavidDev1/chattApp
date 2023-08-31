import ChatFeed from "../ChatFeed/ChatFeed"
import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import './Main.css'

function Main() {
  return (
    <div className="main min-h-screen flex flex-col justify-center w-94 mx-auto scale-100 md:scale-125">
      <div className="container bg-white rounded shadow-lg h-3/5">
        <Header />
        <div className="content flex justify-between gap-2">
          <div className="sidebar w-full border-r border-2 border-solid border-gray-200">
            <Sidebar />
          </div>
          <div className="chatfeed w-full border-2 border-solid border-gray-200 overflow-auto">
            <ChatFeed />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Main
