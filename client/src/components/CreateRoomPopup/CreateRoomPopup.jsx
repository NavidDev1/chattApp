function CreateRoomPopup({ onClose }) {
    return (
      <div className="bg-slate-500 flex flex-col items-center justify-center gap-2 absolute w-96 h-60 top-0 right-0 m-40">
        <h1>Create Room</h1>
        <input type="text" />
        <button>Create</button>
        <button onClick={onClose}>Close</button>
      </div>
    )
  }
  
  export default CreateRoomPopup