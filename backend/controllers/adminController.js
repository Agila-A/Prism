// controllers/adminController.js
const db = require('../models');
const Admin = db.Admin;
const bcrypt = require('bcrypt');

// Create new admin
// exports.createAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const admin = await Admin.create({ email, password: hashedPassword });
//     res.status(201).json({ message: 'Admin created successfully', admin });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Admin login
exports.adminLogin = async (req, res) => {
  try {
   
    const { email, password } = req.body;

    // Remove leading/trailing spaces
    

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    
    console.log('Stored password:', admin.password);

    // Compare password
    try {
      
  const match = password === admin.password
  if (!match) return res.status(401).json({ message: 'Invalid password' });
  
} catch(err) {
  console.error('Password comparison error:', err);
  return res.status(500).json({ message: 'Server error during password check' });
}


    res.status(200).json({ message: 'Login successful', adminId: admin.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all admins (optional)
// exports.getAdmins = async (req, res) => {
//   try {
//     const admins = await Admin.findAll();
//     res.status(200).json(admins);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
