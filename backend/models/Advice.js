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
  },
});

module.exports = Advice;
