const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve your index.html and other files automatically
app.use(express.static(__dirname));

let volunteers = {}; // Store volunteer locations: {socketId: {lat, lng}}

io.on('connection', (socket) => {
    console.log(`📡 New Node Connected: ${socket.id}`);

    // Volunteer registers location
    socket.on('volunteer-register', (data) => {
        volunteers[socket.id] = { lat: data.lat, lng: data.lng };
        console.log(`👨‍🚒 Volunteer registered: ${socket.id} at ${data.lat}, ${data.lng}`);
    });

    // Listen for the SOS signal from the phone
    socket.on('sos-signal', (data) => {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`🚨 [${timestamp}] SOS Received at Lat: ${data.lat}, Lng: ${data.lng}`);

        // Find nearest volunteers (simple distance calculation)
        const emergency = { lat: data.lat, lng: data.lng };
        const nearest = findNearestVolunteers(emergency, 3); // Top 3 nearest

        // Broadcast the location to everyone (the laptop map)
        io.emit('volunteer-alert', {
            ...data,
            time: timestamp,
            id: socket.id,
            nearestVolunteers: nearest
        });
    });

    socket.on('disconnect', () => {
        delete volunteers[socket.id];
        console.log(`❌ Node Disconnected: ${socket.id}`);
    });
});

// Simple function to find nearest volunteers using Haversine distance
function findNearestVolunteers(emergency, count) {
    const distances = Object.entries(volunteers).map(([id, vol]) => ({
        id,
        distance: haversineDistance(emergency, vol),
        lat: vol.lat,
        lng: vol.lng
    }));
    distances.sort((a, b) => a.distance - b.distance);
    return distances.slice(0, count);
}

function haversineDistance(coord1, coord2) {
    const R = 6371; // Earth's radius in km
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Use PORT 3000 and listen on 0.0.0.0 to allow phone connections
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Advanced Emergency Server Active!`);
    console.log(`🔗 Local Link: http://localhost:${PORT}`);
    console.log(`📲 Network Link: Check your IP in terminal with 'ipconfig'`);
});