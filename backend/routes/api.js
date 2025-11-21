// backend/routes/api.js
const express = require("express");
const router = express.Router();

// require controllers
const accountCtrl = require("../controllers/accountController");

// account endpoints
router.get("/account/balance", accountCtrl.getBalance);

module.exports = router;
