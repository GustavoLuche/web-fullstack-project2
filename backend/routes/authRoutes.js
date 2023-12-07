const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { generateToken, verifyPassword } = require("../services/authService");
const logController = require("../controllers/logController");

// Rota de login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validação de entrada
    if (!username || !password) {
      // Registro de falha de identificação
      await logController.logMessage({
        message: "Falha de identificação: Usuário e senha são obrigatórios",
        username: username,
        actionType: "authentication_failure",
      });

      return res
        .status(400)
        .json({ status: false, message: "Usuário e senha são obrigatórios" });
    }

    const user = await userController.getByUsername(username);

    if (user) {
      // Verificar a senha usando bcrypt
      const isPasswordValid = await verifyPassword(password, user.password);

      if (!isPasswordValid) {
        // Registro de falha de autenticação
        await logController.logMessage({
          message: "Falha de autenticação: username ou senha inválidos",
          username: username,
          actionType: "authentication_failure",
        });

        return res
          .status(401)
          .json({ status: false, message: "username ou senha inválidos" });
      }

      // Registro de login bem-sucedido
      await logController.logMessage({
        message: "Login bem-sucedido",
        username: username,
        actionType: "authentication_success",
      });

      // Gerar o token de autenticação
      const token = generateToken(user.id, user.username);

      // Retornar a resposta com o usuário autenticado e o token
      return res.json({ status: true, user: user, token: token });
    } else {
      // Registro de falha de identificação
      await logController.logMessage({
        message: "Falha de identificação: Usuário não encontrado",
        username: username,
        actionType: "authentication_failure",
      });

      return res
        .status(404)
        .json({ status: false, message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Falha ao buscar o usuário:", error);

    // Registro de falha de autenticação
    await logController.logMessage({
      message:
        "Falha de autenticação: Não foi possível processar a solicitação",
      username: req.body.username,
      actionType: "authentication_failure",
    });

    return res.status(500).json({
      status: false,
      message: "Não foi possível processar a solicitação",
    });
  }
});

module.exports = router;
