// backend/index.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// Conecta ao banco de dados
const { connectToDatabase } = require("./config/database");
connectToDatabase();

// Middleware para parsing de JSON
app.use(express.json());

// Rotas de autenticação
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// Rota para Instalação
const installRouter = require("./routes/installAPI");
app.use("/install", installRouter);

// Define uma rota para a raiz ("/") que envia uma mensagem simples
app.get("/", (req, res) => {
  res.send("Express server running successfully!");
});

// Inicia o servidor e escuta na porta especificada
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
