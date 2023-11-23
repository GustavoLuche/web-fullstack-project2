import axios from "axios";

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
