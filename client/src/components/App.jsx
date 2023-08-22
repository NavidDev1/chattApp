import React, { useState, useContext, useEffect } from 'react';
import UserInput from './UserInput/UserInput';
import RoomList from './RoomList/RoomList';
import Room from './Room/Room';
import { SocketProvider, SocketContext } from '../context/SocketContext';

function App() {
  const [displayName, setDisplayName] = useState('');
  const [activeRooms, setActiveRooms] = useState([]);
  const [messages, setMessages] = useState({});
  const socket = useContext(SocketContext);
  const addMessage = (newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }

  const handleReceivedMessage = (room, message) => {
    setMessages(prev => ({
      ...prev,
      [room]: [...(prev[room] || []), message]
    }));
  };

  useEffect(() => {
    if (socket) {
      socket.on('receive-message', handleReceivedMessage);
    }

    return () => {
      if (socket) {
        socket.off('receive-message', handleReceivedMessage);
      }
    };
  }, [socket]);

  return (
    <div className="App">
      <h1>Socket Chat App</h1>
      <UserInput setDisplayName={setDisplayName} />
      <RoomList
        displayName={displayName}
        activeRooms={activeRooms}
        setActiveRooms={setActiveRooms}
      />
      {activeRooms.map(room => (
        <Room
          key={room}
          roomName={room}
          messages={messages[room] || []}
          handleReceivedMessage={(newMessage) => handleReceivedMessage(room, newMessage)}
        />
      ))}
    </div>
  );
}

export default App;
