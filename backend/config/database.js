const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao Banco de Dados!");
  } catch (error) {
    console.error("Falha na conexão:", error);
  }
}

module.exports = {
  sequelize,
  connectToDatabase,
};
