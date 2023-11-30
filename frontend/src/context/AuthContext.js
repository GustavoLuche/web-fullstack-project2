import React, { createContext, useReducer, useContext } from "react";
// import { authService } from "../services/authService";

// Estrutura inicial do estado
const initialAuthState = {
  isAuthenticated: false,
};

// Criação do contexto
const AuthContext = createContext();

// Definindo os tipos de ação para usar com useReducer
const SET_AUTHENTICATED = "SET_AUTHENTICATED";

// Função de redução para atualizar o estado com base em ações
function authReducer(authState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...authState, isAuthenticated: action.payload };
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

  return (
    <AuthContext.Provider
      value={{
        authState,
        toggleAuthentication,
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
