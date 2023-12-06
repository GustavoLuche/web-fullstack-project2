// backend/routes/adviceRoutes.js
const express = require("express");
const router = express.Router();
const adviceController = require("../controllers/adviceController");
const userController = require("../controllers/userController");
const logController = require("../controllers/logController ");
const { authenticateToken } = require("../services/authService");

const expressRedisCache = require("express-redis-cache");

// Configuração do cache
const cache = expressRedisCache({
  prefix: "adviceRoutes",
  host: "localhost",
  port: 6379,
  expire: 60,
});

// Rota para inserção de conselho
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { advice } = req.body;
    const newAdvice = await adviceController.save(advice);

    // Registra no log
    await logController.logMessage({
      message: `Novo conselho adicionado: ${newAdvice.id}`,
      username: req.username,
      actionType: "add",
    });

    // Notifica todos os usuários, exceto o usuário atual
    const allUsers = await userController.list();
    const senderUsername = req.username;

    allUsers.forEach(async (user) => {
      if (user.username !== senderUsername) {
        // Envie uma notificação para cada usuário
        await logController.logMessage({
          message: `Novo conselho adicionado por ${senderUsername}: ${newAdvice.id}`,
          username: user.username,
          actionType: "notification",
        });
      }
    });

    // Invalidate the cache
    cache.del("adviceRoutes", function (err) {
      if (err) {
        console.error("Erro ao excluir o cache:", err);
      } else {
        console.log("Cache excluído com sucesso.");
      }
    });
    res.json({
      success: true,
      message: "Conselho adicionado com sucesso.",
      advice: newAdvice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erro ao adicionar conselho.",
      error: error.message,
    });
  }
});

// Rota para buscar conselhos por termo
router.get("/search", authenticateToken, async (req, res) => {
  try {
    const { term } = req.query;

    // Gere uma chave de cache baseada no termo de busca
    const cacheKey = `search:${term || "all"}`;

    // Use a chave de cache personalizada ao chamar cache.route()
    cache.route({
      expire: 60,
      name: cacheKey,
    })(req, res, async () => {
      const advices = await adviceController.getByTerm(term);

      // Registra no log a busca por um termo
      await logController.logMessage({
        message: `Busca realizada por termo: ${term}`,
        username: req.username,
        actionType: "search",
        searchTerm: term,
      });

      res.json({
        success: true,
        message: "Conselhos encontrados com sucesso.",
        advices,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erro ao buscar conselhos por termo.",
      error: error.message,
    });
  }
});

module.exports = router;
