// backend/routes/installAPI.js
const express = require("express");
const router = express.Router();

const { sequelize } = require("../config/database");

const userController = require("../controllers/userController");
const adviceController = require("../controllers/adviceController");

router.get("/", async (req, res) => {
  await sequelize.sync({ force: true });

  const users = await createUsers();
  const advices = await createAdvices();

  res.json({
    status: true,
    users: users,
    advices: advices,
  });
});

const createUsers = async () => {
  const userData = [
    {
      username: "admin",
      password: "admin",
      isAdmin: true,
    },
    {
      username: "john_doe",
      password: "123456",
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
