const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id);

    socket.on('sos-signal', (data) => {
        console.log('SOS Received from client:', data);
        // This sends to EVERYONE including the sender for testing
        io.emit('volunteer-alert', data);
    });
});

server.listen(3000, () => {
    console.log('✅ Server is LIVE on http://localhost:3000');
});