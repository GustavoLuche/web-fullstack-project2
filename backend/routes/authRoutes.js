// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authService = require("../services/authService");

// Rota para autenticação de usuário
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
});

module.exports = router;
