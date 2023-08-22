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

app.use(cors());

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Listen for messages from clients
  socket.on("message", (messageData) => {
    console.log("Received message:", messageData);

    // Broadcast the message to all connected clients, including the sender
    io.emit("message", messageData);
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(3000, () => console.log("Server is up and running"));