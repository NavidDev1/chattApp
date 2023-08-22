import ChatFeed from "../ChatFeed/ChatFeed"
import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"

function Main() {
    return (
      <div>
        <Header />
        <div className="bg-slate-300 flex flex-row gap-4 h-screen justify-center">
          <Sidebar />
          <ChatFeed />
        </div>
      </div>
    )
  }
  
  export default Main
  