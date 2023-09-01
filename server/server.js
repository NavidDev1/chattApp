const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios")
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors())
app.use(express.json())

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

app.post('/gif', async (req, res) => {
  try {
    const keyword = req.body.keyword || "random";
    const response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=${keyword}&rating=g`);
    const gifUrl = response.data.data.images.fixed_height.url;
    res.json({ gifUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Set med alla rooms
const rooms = new Set()
// Default room lobby
rooms.add("Lobby")

const roomMessages = {}
const usersInRooms = {};

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
  });

  socket.on("set_username", (username) => {
    socket.username = username;
});

    socket.on("join_room", (room) => {
        socket.join(room)
        rooms.add(room)

        if(!roomMessages[room]) {
            roomMessages[room] = []
        }

        if (!usersInRooms[room]) {
          usersInRooms[room] = [];
      }

      if (!usersInRooms[room].includes(socket.username)) {
        usersInRooms[room].push(socket.username);
    }

        console.log("User with id:", socket.id, "joined room:", room);
        io.emit("list_of_rooms", Array.from(rooms))
        io.to(room).emit("update_users_in_room", room, usersInRooms[room]);
        console.log("Users in Room: ", usersInRooms);
        console.log(socket.username);
        console.log(io.sockets.adapter.rooms);
    })

    socket.on("create_room", (room) => {
        rooms.add(room)
        io.emit("list_of_rooms", Array.from(rooms))
        console.log("User with id:", socket.id, "created room:", room);
    })

    socket.on("leave_room", (room) => {
      console.log("User with id:", socket.id, "left room:", room);
      if (usersInRooms[room]) {
        usersInRooms[room] = usersInRooms[room].filter((user) => user !== socket.username);
        io.to(room).emit("update_users_in_room", room, usersInRooms[room]);

        if (usersInRooms[room].length === 0) {
          delete usersInRooms[room];
        }
      }
      socket.leave(room)
      
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