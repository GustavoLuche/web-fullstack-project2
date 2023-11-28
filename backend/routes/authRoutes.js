// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { generateToken } = require("../services/authService");

// Rota de login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validação de entrada
    if (!username || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Usuário e senha são obrigatórios" });
    }
    const user = await userController.getByUsername(username);

    if (user) {
      // Verificar a senha
      const isPasswordValid = password === user.password;

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ status: false, message: "E-mail ou senha inválidos" });
      }

      // Gerar o token de autenticação
      const token = generateToken(user.id);

      // Retornar a resposta com o usuário autenticado e o token
      return res.json({ status: true, user: user, token: token });
    } else {
      return res
        .status(404)
        .json({ status: false, message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Falha ao buscar o usuário:", error);
    return res.status(500).json({
      status: false,
      message: "Não foi possível processar a solicitação",
    });
  }
});

module.exports = router;
