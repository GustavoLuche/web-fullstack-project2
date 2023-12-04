// backend/routes/adviceRoutes.js
const express = require("express");
const router = express.Router();
const adviceController = require("../controllers/adviceController");

// Rota para inserção de conselho
router.post("/add", async (req, res) => {
  try {
    const { advice } = req.body;
    const newAdvice = await adviceController.save(advice);
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
router.get("/search", async (req, res) => {
  try {
    const { term } = req.query;
    const advices = await adviceController.getByTerm(term);
    res.json({
      success: true,
      message: "Conselhos encontrados com sucesso.",
      advices,
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
