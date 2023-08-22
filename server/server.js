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

console.log(rooms);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Listen for messages from clients
  socket.on("message", (messageData) => {
    console.log("Received message:", messageData);

    roomMessages[messageData.room].push(messageData)
    // Broadcast the message to all connected clients, including the sender
    io.to(messageData.room).emit("message", messageData);
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

    socket.on("join_room", (room) => {
        socket.join(room)
        rooms.add(room)

        if(!roomMessages[room]) {
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
        socket.leave(room)
        console.log("User with id:", socket.id, "left room:", room);

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