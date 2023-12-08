// backend/models/Advice.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

// Define o modelo Advice no banco de dados
const Advice = sequelize.define("Advice", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  advice: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "O campo 'advice' não pode ser nulo.",
      },
      notEmpty: {
        msg: "O campo 'advice' não pode estar vazio.",
      },
      len: {
        args: [3, 146], // Defina o comprimento máximo desejado
        msg: "O conselho deve ter entre 1 e 146 caracteres.",
      },
    },
  },
});

module.exports = Advice;
