// frontend/src/services/axiosConfig.js
import axios from "axios";

// Cria uma instância do Axios
const axiosInstance = axios.create();

// Intercepta as requisições antes de serem enviadas
axiosInstance.interceptors.request.use(
  (config) => {
    // Adiciona o token de autenticação aos cabeçalhos se estiver disponível
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Trata erros na requisição
    return Promise.reject(error);
  }
);

export default axiosInstance;
