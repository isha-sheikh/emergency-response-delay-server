# SwiftResponse: Emergency Response Delay Solver

### The Problem
Traditional emergency services rely on voice calls and manual dispatch, causing critical delays.

### My Solution
A real-time web application using **WebSockets (Socket.io)** and **Node.js** that:
- Allows victims to broadcast GPS coordinates with one click.
- Instantly notifies all nearby responders without refreshing.
- Provides fastest-path routing guidance using Leaflet Routing Machine.
- Reduces dispatch delay to near-zero.

### Features
- **Quick SOS Request:** One-click location sharing for emergencies.
- **Real-time Notifications:** Instant alerts to registered volunteers.
- **Volunteer Registration:** Responders can register their location.
- **Fastest Path Guidance:** Interactive routing from volunteer to emergency site.
- **Map Visualization:** Live tracking on OpenStreetMap.

### Tech Stack
- **Backend:** Node.js, Express, Socket.io
- **Frontend:** HTML5 Geolocation API, Leaflet Maps, Leaflet Routing Machine
- **Real-time:** WebSockets

### How to Run
1. Install dependencies: `npm install`
2. Start server: `node server.js`
3. Open `http://localhost:3000` in browser
4. Register as volunteer or send SOS

### Using on Phone/Mobile Device
To access the app from your phone or another device on the same network:

1. **Find your computer's IP address:**
   - Run `ipconfig` in terminal (Windows) or `ifconfig` (Linux/Mac)
   - Look for "IPv4 Address" under your active network adapter (usually starts with 192.168.x.x)

2. **Access from phone:**
   - Open browser on your phone
   - Go to `http://<YOUR_IP_ADDRESS>:3000` (replace with actual IP)
   - Example: `http://192.168.1.100:3000`

3. **Requirements:**
   - Phone and computer must be on the same Wi-Fi network
   - Ensure firewall allows connections on port 3000
   - Enable location permissions in browser for GPS functionality

4. **Usage:**
   - **Victims:** Tap "BROADCAST SOS" to send location
   - **Volunteers:** Tap "REGISTER AS VOLUNTEER" then "Get Fastest Route" on emergencies
