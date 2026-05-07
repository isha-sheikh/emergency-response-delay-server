const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log(`📡 New Node Connected: ${socket.id}`);

    socket.on('sos-signal', (data) => {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`🚨 [${timestamp}] SOS Received at ${data.lat}, ${data.lng}`);

        // Broadcast to EVERYONE connected
        io.emit('volunteer-alert', {
            ...data,
            time: timestamp,
            id: socket.id
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`✅ Advanced Emergency Server Active on Port ${PORT}`);
});