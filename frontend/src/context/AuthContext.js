// frontend/src/constex/AuthContext.js
import React, { createContext, useReducer, useContext, useEffect } from "react";
import { login, isTokenValid } from "../services/authService";

// Estrutura inicial do estado
const initialAuthState = {
  isAuthenticated: false,
  token: null,
};

// Criação do contexto
const AuthContext = createContext();

// Definindo os tipos de ação para usar com useReducer
const SET_AUTHENTICATED = "SET_AUTHENTICATED";
const SET_TOKEN = "SET_TOKEN";

// Função de redução para atualizar o estado com base em ações
function authReducer(authState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...authState, isAuthenticated: action.payload };
    case SET_TOKEN:
      return { ...authState, token: action.payload };
    default:
      return authState;
  }
}

// Provedor do contexto que fornece o estado e funções de atualização
export function AuthContextProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  // Verificar token ao inicializar
  useEffect(() => {
    checkTokenValidity();
  }, []);

  const toggleAuthentication = (value) => {
    dispatch({ type: SET_AUTHENTICATED, payload: value });
  };

  const performLogin = async (username, password) => {
    try {
      const result = await login(username, password);
      dispatch({ type: SET_TOKEN, payload: result.token });
      toggleAuthentication(true);

      // Armazenar token no local storage
      localStorage.setItem("token", result.token);

      return result;
    } catch (error) {
      // Tratar erros de login, se necessário
      console.error("Erro ao fazer login:", error);
      return null;
    }
  };

  const performLogout = () => {
    // Remover token do local storage
    localStorage.removeItem("token");

    dispatch({ type: SET_TOKEN, payload: null });
    toggleAuthentication(false);
  };

  // Função para verificar a validade do token
  const checkTokenValidity = () => {
    const storedToken = localStorage.getItem("token");

    if (storedToken && isTokenValid(storedToken)) {
      // Token válido
      dispatch({ type: SET_TOKEN, payload: storedToken });
      toggleAuthentication(true);
    } else {
      // Token inválido ou ausente
      performLogout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        toggleAuthentication,
        performLogin,
        performLogout,
        isTokenValid,
        checkTokenValidity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
}
