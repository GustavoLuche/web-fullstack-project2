// backend/services/authService.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Função para gerar o token de autenticação
function generateToken(userId) {
  const jwtSecret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;
  console.log(jwtSecret);
  console.log(expiresIn);
  const token = jwt.sign({ userId: userId }, jwtSecret, {
    expiresIn: expiresIn,
  });

  return token;
}

// Função para validar o token de autenticação
function authenticateToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];

  const token = authorizationHeader
    ? authorizationHeader.replace("Bearer ", "")
    : "";

  if (!token) {
    return res
      .status(401)
      .json({ error: "Token de autenticação não fornecido" });
  }

  const jwtSecret = process.env.JWT_SECRET;
  jwt.verify(token, jwtSecret, (err, payload) => {
    if (err) {
      res
        .status(403)
        .json({ status: false, msg: "Acesso negado - Token invalido" });
      return;
    }
    req.userId = payload.userId;

    next();
  });
}

// Função para gerar o hash da senha
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Função para verificar a senha
async function verifyPassword(plainTextPassword, hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}

module.exports = {
  authenticateToken,
  generateToken,
  hashPassword,
  verifyPassword,
};
