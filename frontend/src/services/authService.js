// frontend/src/services/authService.js
import axios from "axios";

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

