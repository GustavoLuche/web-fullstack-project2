// frontend/src/constex/authContext.js
import React, { createContext, useReducer, useContext } from "react";
import { login } from "../services/authService";

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

  const toggleAuthentication = (value) => {
    dispatch({ type: SET_AUTHENTICATED, payload: value });
  };

  const performLogin = async (username, password) => {
    try {
      const result = await login(username, password);
      dispatch({ type: SET_TOKEN, payload: result.token });
      toggleAuthentication(true);
      return result;
    } catch (error) {
      // Tratar erros de login, se necessário
      console.error("Erro ao fazer login:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        toggleAuthentication,
        performLogin,
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
