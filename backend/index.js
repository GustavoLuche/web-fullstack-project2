// backend/index.js
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 3001;

const app = express();

// Conecta ao banco de dados
const { connectToDatabase } = require("./config/database");
connectToDatabase();

// Middleware para parsing de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use o middleware cors
app.use(cors());

// Rotas de autenticação
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// Rotas de advices
const adviceRoutes = require("./routes/adviceRoutes");
app.use("/advice", adviceRoutes);

// Rotas de notificação
const notificationRoutes = require("./routes/notificationRoutes");
app.use("/notification", notificationRoutes);

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
