import React from "react";
import { useAdviceContext } from "../context/AdviceContext";

// O componente "ErrorMessage" é responsável por exibir mensagens de erro na interface.
function ErrorMessage() {
  // Usando o contexto para acessar o estado
  const { state } = useAdviceContext();
  const { error } = state;

  return <p className="text-danger mt-4 mb-4 text-center">{error}</p>;
}

export default ErrorMessage;
