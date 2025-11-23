// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Create admin
// router.post('/create', adminController.createAdmin);

// Admin login
router.post('/login', adminController.adminLogin);

// Get all admins (optional)
// router.get('/', adminController.getAdmins);

module.exports = router;
