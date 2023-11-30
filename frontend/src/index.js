import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { AdviceContextProvider } from "./context/AdviceContext";
import { AuthContextProvider } from "./context/AuthContext";

// Renderiza o aplicativo dentro do contexto fornecido pelo AdviceContextProvider
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AdviceContextProvider>
        <App />
      </AdviceContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
