const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors())

// Set med alla rooms
const rooms = new Set()
// Default room lobby
rooms.add("Lobby")

const roomMessages = {}
const userMap = new Map(); // key: socket ID, value: username
const roomMap = new Map(); // key: room name, value: array of usernames


console.log(rooms);
console.log(roomMessages);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("typing_start", (data) => {
    socket.to(data.room).emit("user_typing", data);
  });

  socket.on("typing_end", (data) => {
    socket.to(data.room).emit("user_stopped_typing", data);
  });

  // Listen for messages from clients
  socket.on("message", (messageData) => {
    console.log("Received message:", messageData);

    if (!roomMessages[messageData.room]) {
      roomMessages[messageData.room] = [];
    }

    roomMessages[messageData.room].push(messageData)
    // Broadcast the message to all connected clients, including the sender
    io.to(messageData.room).emit("message", messageData);
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);

    const username = userMap.get(socket.id);
    for (const [room, users] of roomMap.entries()) {
      const index = users.indexOf(username);
      if (index > -1) {
        users.splice(index, 1);
      }
      if (users.length === 0) {
        roomMap.delete(room);
      } else {
        roomMap.set(room, users);
      }
    }
    userMap.delete(socket.id);

  });
  socket.on("setUsername", (username, callback) => {
    // Some logic to set the username...
    userMap.set(socket.id, username);
    // Send acknowledgment back to the client.
    callback({ success: true });
  });
  socket.on("get_users_in_rooms", (callback) => {
    // Convert the Map to a plain object for easier consumption on the client-side
    const roomsWithUsers = {};
    for (let [room, users] of roomMap.entries()) {
      roomsWithUsers[room] = users;
    }
    callback(roomsWithUsers);
  });



  socket.on("join_room", (room) => {
    socket.join(room)
    rooms.add(room)
    const username = userMap.get(socket.id);

    if (roomMap.has(room)) {
      roomMap.get(room).push(username);
    } else {
      roomMap.set(room, [username]);
    }

    io.to(room).emit('users_in_room', roomMap.get(room)); // Send the updated list to the room


    if (!roomMessages[room]) {
      roomMessages[room] = []
    }

    console.log("User with id:", socket.id, "joined room:", room);
    io.emit("list_of_rooms", Array.from(rooms))
    console.log(io.sockets.adapter.rooms);
  })

  socket.on("create_room", (room) => {
    rooms.add(room)
    io.emit("list_of_rooms", Array.from(rooms))
    console.log("User with id:", socket.id, "created room:", room);
  })

  socket.on("leave_room", (room) => {

    console.log("User with id:", socket.id, "left room:", room);
    socket.leave(room);
    const username = userMap.get(socket.id);
    const usersInRoom = roomMap.get(room) || [];
    const index = usersInRoom.indexOf(username);
    if (index > -1) {
      usersInRoom.splice(index, 1);
    }

    // If the room is empty (other than "Lobby"), you can delete it from the map
    if (usersInRoom.length === 0 && room !== "Lobby") {
      roomMap.delete(room);
    }
    if (roomMap.has(room)) {
      const users = roomMap.get(room);
      const index = users.indexOf(username);
      if (index > -1) {
        users.splice(index, 1);
      }
      if (users.length === 0) {
        roomMap.delete(room);
      } else {
        roomMap.set(room, users);
      }
    }

    if (room !== "Lobby") {
      const roomSize = io.sockets.adapter.rooms.get(room)?.size || 0;
      if (roomSize === 0) {
        rooms.delete(room);
        io.emit("list_of_rooms", Array.from(rooms));
        console.log("Room removed:", room);
      }
    }
  })
});

server.listen(3000, () => console.log("Server is up and running"));