const AdviceModel = require("../models/Advice");
const Sequelize = require("sequelize");

module.exports = {
  list: async () => {
    const advices = await AdviceModel.findAll();
    return advices;
  },

  save: async (adviceText) => {
    try {
      // Evita SQL Injection usando prepared statements
      const newAdvice = await AdviceModel.create({
        advice: adviceText,
      });
      return newAdvice;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, updatedAdviceText) => {
    try {
      const existingAdvice = await AdviceModel.findByPk(id);
      if (!existingAdvice) return false;

      // Evita SQL Injection usando prepared statements
      await existingAdvice.update({
        advice: updatedAdviceText,
      });

      return existingAdvice;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const adviceToDelete = await AdviceModel.findByPk(id);
      if (!adviceToDelete) return false;
      await adviceToDelete.destroy();
      return adviceToDelete;
    } catch (error) {
      throw error;
    }
  },

  getByAdvice: async (adviceText) => {
    try {
      // Evita SQL Injection usando prepared statements
      const foundAdvice = await AdviceModel.findOne({
        where: Sequelize.where(Sequelize.fn("lower", Sequelize.col("advice")), {
          [Sequelize.Op.like]: "%" + adviceText.toLowerCase() + "%",
        }),
      });
      if (!foundAdvice) return false;
      return foundAdvice;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const advice = await AdviceModel.findByPk(id);
      return advice;
    } catch (error) {
      throw error;
    }
  },

  getByTerm: async (term) => {
    try {
      // Evita SQL Injection usando prepared statements
      const advices = await AdviceModel.findAll({
        where: Sequelize.where(Sequelize.fn("lower", Sequelize.col("advice")), {
          [Sequelize.Op.like]: "%" + term.toLowerCase() + "%",
        }),
      });
      return advices;
    } catch (error) {
      throw error;
    }
  },
};
