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

// Use o middleware cors para lidar com CORS
app.use(cors());

// Rotas de autenticação
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// Rotas de conselhos (advices)
const adviceRoutes = require("./routes/adviceRoutes");
app.use("/advice", adviceRoutes);

// Rotas de notificação
const notificationRoutes = require("./routes/notificationRoutes");
app.use("/notification", notificationRoutes);

// Rota para instalação
const installRouter = require("./routes/installAPI");
app.use("/install", installRouter);

// Rota para a raiz ("/") que envia uma mensagem simples
app.get("/", (req, res) => {
  res.send("Express server running successfully!");
});

// Configura o RabbitMQ
const { setupRabbitMQ } = require("./config/rabbitmqConfig");

// Configura e consome mensagens do RabbitMQ
setupRabbitMQ().then(({ channel, exchange }) => {
  // Cria uma fila temporária exclusiva
  channel.assertQueue("", { exclusive: true }).then((q) => {
    // Liga a fila ao exchange
    channel.bindQueue(q.queue, exchange, "");

    // Consume mensagens do RabbitMQ
    channel.consume(
      q.queue,
      (msg) => {
        // Processa a mensagem conforme necessário
        const logMessage = msg.content.toString();
        console.log("Received log message:", logMessage);
      },
      { noAck: true }
    );
  });
});

// Inicia o servidor e escuta na porta especificada
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
