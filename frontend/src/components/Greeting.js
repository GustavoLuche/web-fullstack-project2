// frontend/src/components/Greeting.js
import React from "react";
import { useAdviceContext } from "../context/AdviceContext.js";

// O componente Greeting exibe uma mensagem de boas-vindas na aplicação.
function Greeting() {
  // Usando o contexto para acessar o estado
  const { state } = useAdviceContext();
  const { showSearchPage } = state;

  return (
    <div className="App-greeting mb-4">
      <h2 className={!showSearchPage ? "text-center" : "text-center text-danger"}>
        Welcome to the Advice Slip Search
      </h2>
      <p className="text-center m-0">
        Get advice on various topics. Start by entering a search term below.
      </p>
    </div>
  );
}

export default Greeting;
