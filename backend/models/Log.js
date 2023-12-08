// backend/models/Log.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

// Define o modelo Log no banco de dados
const LogModel = sequelize.define("Log", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  actionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  searchTerm: {
    type: DataTypes.STRING,
  },
});

module.exports = LogModel;
