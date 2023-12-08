// backend/controllers/userController.js
const UserModel = require("../models/User");
const { hashPassword } = require("../services/authService");

module.exports = {
  // Obtém uma lista de todos os usuários
  list: async () => {
    const users = await UserModel.findAll();
    return users;
  },

  // Salva um novo usuário no banco de dados
  save: async (username, password, isAdmin) => {
    try {
      // Hash da senha antes de salvar no banco de dados
      const hashedPassword = await hashPassword(password);

      // Cria um novo usuário
      const user = await UserModel.create({
        username: username,
        password: hashedPassword,
        isAdmin: isAdmin,
      });

      return user;
    } catch (error) {
      throw error;
    }
  },

  // Atualiza as informações de um usuário existente
  update: async (id, username, password, isAdmin) => {
    try {
      const user = await UserModel.findByPk(id);
      if (!user) return false;

      // Atualiza as informações do usuário
      await user.update({
        username: username,
        password: password, // Considerar hashing da senha se necessário
        isAdmin: isAdmin,
      });

      return user;
    } catch (error) {
      throw error;
    }
  },

  // Exclui um usuário existente
  delete: async (id) => {
    try {
      const user = await UserModel.findByPk(id);
      if (!user || user.isAdmin) return false;

      // Exclui o usuário
      await user.destroy();
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Obtém um usuário pelo nome de usuário
  getByUsername: async (username) => {
    try {
      const user = await UserModel.findOne({ where: { username: username } });
      if (!user) return false;

      return user;
    } catch (error) {
      throw error;
    }
  },
};
