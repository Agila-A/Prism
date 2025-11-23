require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./models');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test endpoint
app.get('/check', (req, res) => {
  res.send("Backend is Working!!!...");
});

// Admin routes
app.use('/api/admin', adminRoutes);

// DB connection
db.sequelize.authenticate()
  .then(() => console.log("DB Connected ✔️"))
  .catch(err => console.log("DB Connection Failed ❌", err));

// Sync models
db.sequelize.sync()
  .then(() => console.log("Models Synced ✔️"))
  .catch(err => console.log("Sync Error ❌", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server running at http://0.0.0.0:${PORT}`);
// });