// frontend/src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:3001";

const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
