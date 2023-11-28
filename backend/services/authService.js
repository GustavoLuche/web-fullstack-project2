// backend/services/authService.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../models/User");

async function login(username, password) {
  // Lógica de autenticação (substitua pelo seu código)
  const user = await User.findOne({ where: { username, password } });

  if (!user) {
    throw new Error("Authentication failed");
  }

  // Gere um token JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Tempo de expiração do token
  });

  return token;
}

module.exports = {
  login,
};