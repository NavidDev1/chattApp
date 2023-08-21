import Room from "../Room/Room"

function Sidebar() {
    return (
      <div className="bg-slate-400 w-1/6">
        <h1 className="text-4xl font-bold pb-8">Rooms:</h1>
        <Room />
      </div>
    )
  }
  
  export default Sidebar