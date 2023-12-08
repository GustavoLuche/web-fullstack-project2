// backend/routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const logController = require("../controllers/logController");
const { authenticateToken } = require("../services/authService");

/**
 * Rota para obter notificações de um usuário autenticado.
 * Somente usuários autenticados podem acessar esta rota.
 */
router.get("/", authenticateToken, async (req, res) => {
  try {
    // Obtém as notificações para o usuário autenticado
    const notifications = await logController.getNotificationsForUser(
      req.username
    );

    res.json({
      success: true,
      message: "Notificações encontradas com sucesso.",
      notifications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erro ao obter notificações do usuário",
      error: error.message,
    });
  }
});

module.exports = router;
