import axios from "axios";
import axiosInstance from "./axiosConfig";

// Defina a URL base para a API de conselhos
const BASE_URL = "https://api.adviceslip.com/advice";

/**
 * Função assíncrona para buscar conselhos com base em um termo.
 *
 * @param {string} term - O termo de pesquisa para buscar conselhos.
 * @returns {Promise<Array>} Uma matriz de conselhos correspondentes ao termo de pesquisa.
 * @throws {Error} Lança um erro se nenhum conselho for encontrado para o termo especificado.
 */
export async function searchAdviceByTerm(term) {
  try {
    // Construa a URL de pesquisa com base no termo
    const searchURL = `${BASE_URL}/search/${term}`;

    // Faça uma solicitação HTTP GET para a API
    const response = await axios.get(searchURL);

    // Verifique se a resposta foi bem-sucedida e contém dados válidos
    if (response.status === 200 && response.data && response.data.slips) {
      return response.data.slips;
    } else {
      throw new Error("No advice found for the specified term.");
    }
  } catch (error) {
    console.error(`Error when seeking advice: ${error.message}`);
    throw error;
  }
}

/**
 * Função assíncrona para buscar conselhos com base em um termo usando a rota /search da API.
 *
 * @param {string} term - O termo de pesquisa para buscar conselhos.
 * @returns {Promise<Array>} Uma matriz de conselhos correspondentes ao termo de pesquisa.
 * @throws {Error} Lança um erro se houver algum problema com a solicitação ou se nenhum conselho for encontrado.
 */
export async function searchAdviceByTermRoute(term) {
  try {
    // Construa a URL de pesquisa com base no termo
    const searchURL = `http://localhost:3001/advice/search?term=${term}`;

    // Faça uma solicitação HTTP GET para a API
    const response = await axiosInstance.get(searchURL);

    // Verifique se a resposta foi bem-sucedida e contém dados válidos
    if (
      response.status === 200 &&
      response.data &&
      response.data.advices &&
      response.data.advices.length > 0
    ) {
      return response.data.advices;
    } else {
      throw new Error("No advice found for the specified term.");
    }
  } catch (error) {
    console.error(`Error when seeking advice: ${error.message}`);
    throw error;
  }
}

/**
 * Função assíncrona para inserir um novo conselho.
 *
 * @param {string} adviceText - O texto do conselho a ser inserido.
 * @returns {Promise<Object>} Um objeto representando o conselho inserido.
 * @throws {Error} Lança um erro se houver algum problema com a solicitação ou se a inserção falhar.
 */
export async function insertAdvice(adviceText) {
  try {
    // Validar o comprimento do conselho
    if (adviceText.length < 3 || adviceText.length > 146) {
      throw new Error("Advice must be between 3 and 146 characters.");
    }

    // Construa a URL para a rota de inserção
    const insertURL = "http://localhost:3001/advice/add";

    // Faça uma solicitação HTTP POST para a API
    const response = await axiosInstance.post(insertURL, {
      advice: adviceText,
    });

    // Verifique se a resposta foi bem-sucedida e contém dados válidos
    if (
      response.status === 200 &&
      response.data &&
      response.data.success &&
      response.data.advice
    ) {
      return response.data.advice;
    } else {
      throw new Error("Failed to insert advice.");
    }
  } catch (error) {
    console.error(`Error when inserting advice: ${error.message}`);
    throw error;
  }
}

/**
 * Função assíncrona para buscar notificações da API.
 *
 * @returns {Promise<Array>} Uma matriz de notificações.
 * @throws {Error} Lança um erro se houver algum problema com a solicitação ou se nenhuma notificação for encontrada.
 */
export async function getNotifications() {
  try {
    // Construa a URL para a rota de notificações
    const notificationsURL = "http://localhost:3001/notification";

    // Faça uma solicitação HTTP GET para a API
    const response = await axiosInstance.get(notificationsURL);

    // Verifique se a resposta foi bem-sucedida e contém dados válidos
    if (
      response.status === 200 &&
      response.data &&
      response.data.notifications &&
      response.data.notifications.length > 0
    ) {
      return response.data.notifications;
    } else {
      throw new Error("No notifications found.");
    }
  } catch (error) {
    console.error(`Error when fetching notifications: ${error.message}`);
    throw error;
  }
}
