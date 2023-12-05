// frontend/src/services/authService.js
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
    throw error;
  }
}

// Função para verificar a validade do token
export function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Verificando se o token expirou
    if (decoded.exp < currentTime) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return false;
  }
}
