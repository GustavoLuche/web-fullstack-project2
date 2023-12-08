// backend/config/database.js
const Sequelize = require("sequelize");
require("dotenv").config();

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } =
  process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
});

/**
 * Função para conectar ao banco de dados.
 * @returns {Promise<void>} - Resolvida quando a conexão é estabelecida com sucesso.
 * @throws {Error} - Se houver falha na conexão.
 */
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao Banco de Dados!");
  } catch (error) {
    console.error("Falha na conexão:", error);
    throw error;
  }
}

module.exports = {
  sequelize,
  connectToDatabase,
};
