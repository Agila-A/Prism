// backend/controllers/accountController.js
/**
 * Example controller - in a real app connect to DB and use proper auth middleware
 */
async function getBalance(req, res) {
  // in production, validate JWT and fetch user account
  const user = req.user || { id: "demo", balance: "12500.50" };
  res.json({ success: true, balance: user.balance });
}

module.exports = { getBalance };
