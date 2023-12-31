// backend/routes/installAPI.js
const express = require("express");
const router = express.Router();

const { sequelize } = require("../config/database");

const userController = require("../controllers/userController");
const adviceController = require("../controllers/adviceController");
const logController = require("../controllers/logController");

/**
 * Rota para inicializar a API.
 * Realiza a sincronização do banco de dados, cria usuários e conselhos durante a instalação.
 * Registra logs de criação de usuários e conselhos.
 */
router.get("/", async (req, res) => {
  try {
    // Sincroniza o banco de dados (force: true remove e recria as tabelas)
    await sequelize.sync({ force: true });

    // Cria usuários
    const users = await createUsers();

    // Cria conselhos
    const advices = await createAdvices();

    // Log de criação de usuários
    await logController.logMessage({
      message: "Usuários criados durante a instalação",
      username: "system",
      actionType: "installation",
    });

    // Log de criação de conselhos
    await logController.logMessage({
      message: "Conselhos criados durante a instalação",
      username: "system",
      actionType: "installation",
    });

    res.json({
      status: true,
      users: users,
      advices: advices,
    });
  } catch (error) {
    console.error("Erro durante a instalação:", error);
    res.status(500).json({
      status: false,
      message: "Erro durante a instalação",
      error: error.message,
    });
  }
});

/**
 * Cria usuários usando o controller de usuário.
 * @returns {Array} Array de usuários criados.
 */
const createUsers = async () => {
  const userData = [
    {
      username: "admin",
      password: "admin",
      isAdmin: true,
    },
    {
      username: "user",
      password: "user123",
      isAdmin: false,
    },
    {
      username: "jane_smith",
      password: "abcdef",
      isAdmin: false,
    },
    {
      username: "michael_johnson",
      password: "password",
      isAdmin: true,
    },
    {
      username: "sarah_williams",
      password: "pass123",
      isAdmin: false,
    },
    {
      username: "david_brown",
      password: "secret",
      isAdmin: false,
    },
    {
      username: "amanda_davis",
      password: "mypassword",
      isAdmin: false,
    },
    {
      username: "robert_johnson",
      password: "987654",
      isAdmin: false,
    },
    {
      username: "emily_wilson",
      password: "1qaz2wsx",
      isAdmin: true,
    },
    {
      username: "matthew_thompson",
      password: "qwerty",
      isAdmin: false,
    },
    {
      username: "olivia_anderson",
      password: "654321",
      isAdmin: false,
    },
    {
      username: "james_lee",
      password: "abc123",
      isAdmin: false,
    },
    {
      username: "sophia_walker",
      password: "hello123",
      isAdmin: false,
    },
    {
      username: "ethan_harris",
      password: "p@ssw0rd",
      isAdmin: false,
    },
    {
      username: "mia_garcia",
      password: "test123",
      isAdmin: true,
    },
    {
      username: "alexander_clark",
      password: "123abc",
      isAdmin: false,
    },
  ];

  const users = [];

  for (let i = 0; i < userData.length; i++) {
    const user = await userController.save(
      userData[i].username,
      userData[i].password,
      userData[i].isAdmin
    );
    users.push(user);
  }

  return users;
};

/**
 * Cria conselhos usando o controller de conselhos.
 * @returns {Array} Array de conselhos criados.
 */
const createAdvices = async () => {
  const adviceData = [
    {
      adviceText:
        "Embrace the unexpected, life's surprises often lead to the best moments.",
    },
    {
      adviceText:
        "Always carry a pen; you never know when inspiration will strike.",
    },
    {
      adviceText: "When in doubt, dance it out.",
    },
    {
      adviceText: "Don't be afraid to ask for help when you need it.",
    },
    {
      adviceText: "Find joy in the little things; they often matter the most.",
    },
    {
      adviceText:
        "If you want to make the world a better place, start by being kind to yourself.",
    },
    {
      adviceText: "Learn to say 'no' when needed; it's a powerful skill.",
    },
    {
      adviceText:
        "Take a moment to appreciate the beauty of nature around you.",
    },
    {
      adviceText: "Try cooking a new recipe at least once a month.",
    },
    {
      adviceText: "Travel not to escape life, but for life not to escape you.",
    },
  ];

  const advices = [];

  for (let i = 0; i < adviceData.length; i++) {
    const advice = await adviceController.save(adviceData[i].adviceText);
    advices.push(advice);
  }

  return advices;
};

module.exports = router;
