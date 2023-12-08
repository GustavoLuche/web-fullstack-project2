// frontend/src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { AdviceContextProvider } from "./context/AdviceContext";
import { AuthContextProvider } from "./context/AuthContext";

// O método `createRoot` cria uma raiz para renderização no React.
// Ele é usado para garantir uma renderização otimizada no ReactDOM.
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Renderiza o aplicativo dentro dos provedores de contexto fornecidos pelo AdviceContextProvider e AuthContextProvider.
// O <React.StrictMode> é usado para ajudar a detectar potenciais problemas durante o desenvolvimento.
root.render(
  <React.StrictMode>
    {/* O AuthContextProvider envolve o aplicativo para fornecer contexto de autenticação */}
    <AuthContextProvider>
      {/* O AdviceContextProvider envolve o aplicativo para fornecer contexto de conselhos */}
      <AdviceContextProvider>
        {/* O componente principal do aplicativo */}
        <App />
      </AdviceContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// Função para relatar métricas da web ao servidor, se necessário.
reportWebVitals();
