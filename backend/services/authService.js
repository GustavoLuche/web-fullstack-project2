// backend/services/authService.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

/**
 * Função para gerar um token de autenticação usando JWT.
 * @param {number} userId - ID do usuário.
 * @param {string} username - Nome de usuário.
 * @returns {string} Token JWT gerado.
 */
function generateToken(userId, username) {
  const jwtSecret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  const token = jwt.sign({ userId: userId, username: username }, jwtSecret, {
    expiresIn: expiresIn,
  });

  return token;
}

/**
 * Middleware para autenticar um usuário usando o token fornecido.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 * @param {function} next - Próximo middleware.
 */
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
        .json({ status: false, msg: "Acesso negado - Token inválido" });
      return;
    }
    req.userId = payload.userId;
    req.username = payload.username;

    next();
  });
}

/**
 * Função para gerar o hash da senha usando bcrypt.
 * @param {string} password - Senha a ser hashada.
 * @returns {Promise<string>} Hash da senha.
 */
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Função para verificar se a senha corresponde ao hash usando bcrypt.
 * @param {string} plainTextPassword - Senha em texto plano.
 * @param {string} hashedPassword - Hash da senha.
 * @returns {Promise<boolean>} True se a senha corresponder, senão False.
 */
async function verifyPassword(plainTextPassword, hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}

module.exports = {
  authenticateToken,
  generateToken,
  hashPassword,
  verifyPassword,
};
