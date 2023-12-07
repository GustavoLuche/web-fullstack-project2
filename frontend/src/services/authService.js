import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:3001";

export async function login(username, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // O servidor retornou uma resposta com um código de status diferente de 2xx
      const { status, data } = error.response;

      if (status === 400) {
        // Má solicitação do cliente
        alert("Usuário e senha são obrigatórios");
        throw new Error("Usuário e senha são obrigatórios");
      } else if (status === 401) {
        // Autenticação falhou
        alert("username ou senha inválidos");
        throw new Error("username ou senha inválidos");
      } else if (status === 404) {
        // Usuário não encontrado
        alert("Usuário não encontrado");
        throw new Error("Usuário não encontrado");
      } else {
        // Outros erros do servidor
        alert(`Erro do servidor: ${data.message || "Erro desconhecido"}`);
        throw new Error(
          `Erro do servidor: ${data.message || "Erro desconhecido"}`
        );
      }
    } else if (error.request) {
      // A solicitação foi feita, mas não recebeu uma resposta
      alert("Sem resposta do servidor. Verifique sua conexão de internet.");
      throw new Error(
        "Sem resposta do servidor. Verifique sua conexão de internet."
      );
    } else {
      // Algo aconteceu ao configurar a solicitação que desencadeou um erro
      alert(`Erro na configuração da solicitação: ${error.message}`);
      throw new Error(`Erro na configuração da solicitação: ${error.message}`);
    }
  }
}

// Função para verificar a validade do token
export function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Verificando se o token expirou
    if (decoded.exp < currentTime) {
      alert("O token expirou. Faça login novamente.");
      return false;
    } else {
      return true;
    }
  } catch (err) {
    alert("Erro ao validar o token.");
    return false;
  }
}
