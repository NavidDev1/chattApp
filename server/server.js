const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

app.use(cors())

// Set med alla rooms
const rooms = new Set()
// Default room lobby
rooms.add("Lobby")

console.log(rooms);

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id)

    socket.on("join_room", (room) => {
        socket.join(room)
        rooms.add(room)
        console.log("User with id:", socket.id, "joined room:", room);
        io.emit("list_of_rooms", Array.from(rooms))
        console.log(io.sockets.adapter.rooms);
    })

})

server.listen(3000, () => console.log("Server is up and running"))