// backend/controllers/adviceController.js
const AdviceModel = require("../models/Advice");
const Sequelize = require("sequelize");

module.exports = {
  list: async () => {
    const advices = await AdviceModel.findAll();
    return advices;
  },

  save: async (adviceText) => {
    const newAdvice = await AdviceModel.create({
      advice: adviceText, // Atualize o nome da variável aqui
    });
    return newAdvice;
  },

  update: async (id, updatedAdviceText) => {
    const existingAdvice = await AdviceModel.findByPk(id);
    if (!existingAdvice) return false;
    await existingAdvice.update({
      advice: updatedAdviceText, // Atualize o nome da variável aqui
    });

    return existingAdvice;
  },

  delete: async (id) => {
    const adviceToDelete = await AdviceModel.findByPk(id);
    if (!adviceToDelete) return false;
    await adviceToDelete.destroy();
    return adviceToDelete;
  },

  getByAdvice: async (adviceText) => {
    const foundAdvice = await AdviceModel.findOne({
      where: { advice: adviceText },
    });
    if (!foundAdvice) return false;
    return foundAdvice;
  },

  getById: async (id) => {
    const advice = await AdviceModel.findByPk(id);
    return advice;
  },

  getByTerm: async (term) => {
    const advices = await AdviceModel.findAll({
      where: Sequelize.where(Sequelize.fn("lower", Sequelize.col("advice")), {
        [Sequelize.Op.like]: "%" + term.toLowerCase() + "%",
      }),
    });
    return advices;
  },
};
