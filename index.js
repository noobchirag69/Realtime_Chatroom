// const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('./views'));

io.on('connection', socket => {
    
    // Welcome current user
    socket.emit('message', 'Welcome to Pigeon..');

    // Broadcast when a new user connects
    socket.broadcast.emit('message', 'A user has joined the chat!');

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat!');
    });

    // Listen for chat message
    socket.on('chatMessage', msg => {
        io.emit('message', msg);
    });
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));