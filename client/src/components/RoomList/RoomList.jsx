import React, { useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';

const ALL_ROOMS = ['Room1', 'Room2', 'Room3'];  // Example rooms. 

function RoomList({ displayName, activeRooms, setActiveRooms }) {
  const socket = useContext(SocketContext);

  const joinRoom = (roomName) => {
    if (socket && !activeRooms.includes(roomName)) {
      socket.emit('join-room', roomName);
      setActiveRooms([...activeRooms, roomName]);
    }
  };

  return (
    <div className="RoomList">
      <h2>Available Rooms</h2>
      <ul>
        {ALL_ROOMS.filter(r => !activeRooms.includes(r)).map(roomName => (
          <li key={roomName}>
            <button onClick={() => joinRoom(roomName)}>Join {roomName}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
