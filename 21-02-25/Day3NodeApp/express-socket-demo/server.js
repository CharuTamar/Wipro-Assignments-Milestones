const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require('path');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Serve the static client.html file
app.use(express.static(path.join(__dirname, "public"))); // Place client.html in "public" folder

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "client.html"));
});

app.get("/", (req, res) => {
    res.send("Socket.io Chat Server is Running!");
});

// Store connected users
const users = {};

io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    // Listen for username registration
    socket.on("setUsername", (username) => {
        users[socket.id] = username;
        console.log(`👤 ${username} joined the chat`);
        
        // Notify all clients about the updated user list
        io.emit("updateUsers", Object.values(users));
    });

    
    // Listen for messages
    socket.on("message", (msg) => {
        const username = users[socket.id] || "Anonymous";
        console.log(`📩 Message from ${username}:`, msg);
        
        // Broadcast message with username
        io.emit("message", { user: username, text: msg });
    });


    // Listen for typing events
    socket.on("typing", () => {
        const username = users[socket.id];
        socket.broadcast.emit("typing", username);
    });

    socket.on("stopTyping", () => {
        socket.broadcast.emit("stopTyping");
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log(`🔴 ${users[socket.id]} left the chat`);
        delete users[socket.id];

        // Update user list for remaining clients
        io.emit("updateUsers", Object.values(users));
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
