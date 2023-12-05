// frontend/src/App.js

import React from "react";
import HomePage from "./components/HomePage.js";
import InsertionPage from "./components/InsertionPage.js";
import SearchPage from "./components/SearchPage.js";
import NotificationPage from "./components/NotificationPage.js";
import { useAuthContext } from "./context/AuthContext";
import { useAdviceContext } from "./context/AdviceContext.js";
import "./App.css";
import Login from "./components/Login.js";

function App() {
  // Usando o contexto para acessar o estado
  const { authState } = useAuthContext();
  const { isAuthenticated } = authState;
  const { state } = useAdviceContext();
  const { showInsertionPage, showSearchPage, showNotificationPage } = state;

  // Renderiza a página apropriada com base no estado
  const renderPage = () => {
    if (!isAuthenticated) {
      return <Login />;
    }

    if (showInsertionPage) {
      // Renderiza a InsertionPage
      return <InsertionPage />;
    } else if (showSearchPage) {
      // Renderiza a SearchPage
      return <SearchPage />;
    } else if (showNotificationPage) {
      // Renderiza a NotificationPage
      return <NotificationPage />;
    } else {
      // Renderiza a HomePage por padrão
      return <HomePage />;
    }
  };

  return <>{renderPage()}</>;
}

export default App;
