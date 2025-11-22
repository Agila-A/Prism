require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./models');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/check', (req, res) => {
  res.send("Backend is Working!!!...");
});

db.sequelize.authenticate()
  .then(() => console.log("DB Connected ✔️"))
  .catch(err => console.log("DB Connection Failed ❌", err));

db.sequelize.sync()
  .then(() => console.log("Models Synced ✔️"))
  .catch(err => console.log("Sync Error ❌", err));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
