const UserModel = require("../models/User");

module.exports = {
  list: async () => {
    const users = await UserModel.findAll();
    return users;
  },

  save: async (username, password, isAdmin) => {
    const user = await UserModel.create({
      username: username,
      password: password,
      isAdmin: isAdmin,
    });
    return user;
  },

  update: async (id, username, password, isAdmin) => {
    const user = await UserModel.findByPk(id);
    if (!user) return false;
    await user.update({
      username: username,
      password: password,
      isAdmin: isAdmin,
    });

    return user;
  },

  delete: async (id) => {
    const user = await UserModel.findByPk(id);
    if (!user || user.isAdmin) return false;
    await user.destroy();
    return user;
  },

  getByUsername: async (username) => {
    const user = await UserModel.findOne({ where: { username: username } });
    if (!user) return false;
    return user;
  },
};
