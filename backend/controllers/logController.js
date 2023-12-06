// backend/controllers/logController.js
const LogModel = require("../models/Log.js");

module.exports = {
  list: async () => {
    const logs = await LogModel.findAll();
    return logs;
  },

  logMessage: async ({ message, username, actionType, searchTerm }) => {
    const log = await LogModel.create({
      message: message,
      username: username,
      actionType: actionType,
      searchTerm: searchTerm,
    });
    return log;
  },
};
