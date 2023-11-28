const express = require("express");
const router = express.Router();

const { sequelize } = require("../config/database");

const userController = require("../controllers/userController");

router.get("/", async (req, res) => {
  await sequelize.sync({ force: true });

  const users = await createUsers();

  res.json({
    status: true,
    users: users,
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

module.exports = router;
