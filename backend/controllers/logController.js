// backend/controllers/logController.js
const LogModel = require("../models/Log.js");

module.exports = {
  // Obtém uma lista de todos os registros de log
  list: async () => {
    const logs = await LogModel.findAll();
    return logs;
  },

  // Registra uma mensagem no log
  logMessage: async ({ message, username, actionType, searchTerm }) => {
    try {
      // Cria um novo registro de log
      const log = await LogModel.create({
        message: message,
        username: username,
        actionType: actionType,
        searchTerm: searchTerm,
      });

      return log;
    } catch (error) {
      throw error;
    }
  },

  // Obtém todas as notificações para um usuário específico
  getNotificationsForUser: async (username) => {
    try {
      // Obtém notificações específicas para o usuário
      const notifications = await LogModel.findAll({
        where: {
          username: username,
          actionType: "notification",
        },
      });

      return notifications;
    } catch (error) {
      throw error;
    }
  },
};
