import React from "react";
import HomePage from "./components/HomePage.js";
import { useAuthContext } from "./context/AuthContext";
import "./App.css";
import Login from "./components/Login.js";

function App() {
  // Usando o contexto para acessar o estado
  const { authState } = useAuthContext();
  const { isAuthenticated } = authState;

  return <>{!isAuthenticated ? <Login /> : <HomePage />}</>;
}

export default App;