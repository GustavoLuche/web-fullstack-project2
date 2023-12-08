// backend/controllers/adviceController.js
const AdviceModel = require("../models/Advice");
const Sequelize = require("sequelize");

module.exports = {
  // Obtém uma lista de todos os conselhos
  list: async () => {
    const advices = await AdviceModel.findAll();
    return advices;
  },

  // Salva um novo conselho no banco de dados
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

  // Atualiza um conselho existente com um novo texto
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

  // Exclui um conselho com base no ID
  delete: async (id) => {
    try {
      const adviceToDelete = await AdviceModel.findByPk(id);
      if (!adviceToDelete) return false;

      // Exclui o conselho
      await adviceToDelete.destroy();
      return adviceToDelete;
    } catch (error) {
      throw error;
    }
  },

  // Obtém um conselho específico com base no texto
  getByAdvice: async (adviceText) => {
    try {
      // Evita SQL Injection usando prepared statements
      const foundAdvice = await AdviceModel.findOne({
        where: Sequelize.where(Sequelize.fn("lower", Sequelize.col("advice")), {
          [Sequelize.Op.like]: "%" + adviceText.toLowerCase() + "%",
        }),
      });

      return foundAdvice || false;
    } catch (error) {
      throw error;
    }
  },

  // Obtém um conselho específico com base no ID
  getById: async (id) => {
    try {
      const advice = await AdviceModel.findByPk(id);
      return advice;
    } catch (error) {
      throw error;
    }
  },

  // Obtém uma lista de conselhos com base em um termo de pesquisa
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
