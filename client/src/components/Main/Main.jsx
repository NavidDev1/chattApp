import ChatFeed from "../ChatFeed/ChatFeed"
import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import './Main.css'

function Main() {
  return (
    <div className="main min-h-screen flex flex-col justify-center bg-gray-200">
      <div className="container mx-auto bg-white p-4 rounded shadow-lg w-3/4 h-3/5">
        <Header />
        <div className="content flex mt-4">
          <div className=" sidebar w-1/4 p-4 border-r border-gray-300">
            <Sidebar />
          </div>
          <div className="chatfeed w-3/4 p-4">
            <ChatFeed />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Main
