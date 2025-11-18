// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000; // Choose a port

// --- Middleware ---
// Enable CORS for all routes
app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.json());

app.get('/check', (req, res) => {
   res.send("Backend is Working!!!...")
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access at: http://localhost:${PORT}`);
});