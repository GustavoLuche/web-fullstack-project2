const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Advice = sequelize.define("Advice", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  advice: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo 'advice' não pode ser nulo.",
      },
      notEmpty: {
        msg: "O campo 'advice' não pode estar vazio.",
      },
      len: {
        args: [1, 146], // Defina o comprimento máximo desejado
        msg: "O conselho deve ter entre 1 e 146 caracteres.",
      },
    },
  },
});

module.exports = Advice;
