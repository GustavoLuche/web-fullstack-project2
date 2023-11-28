// backend/services/authService.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Função para gerar o token de autenticação
function generateToken(userId) {
  const jwtSecret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

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

module.exports = {
  authenticateToken,
  generateToken,
};