// frontend/src/components/ErrorMessage.js
import React from "react";
import PropTypes from "prop-types"; // Importe PropTypes para validar as propriedades
import { useAdviceContext } from "../context/AdviceContext";

// O componente "ErrorMessage" é responsável por exibir mensagens de erro na interface.
function ErrorMessage() {
  // Usando o contexto para acessar o estado
  const { state } = useAdviceContext();
  const { error } = state;

  // Verificar se há uma mensagem de erro antes de renderizar
  if (!error) {
    return null;
  }

  return <p className="text-danger mt-4 mb-4 text-center">{error}</p>;
}

// Defina PropTypes para garantir a integridade das propriedades
ErrorMessage.propTypes = {
  error: PropTypes.string,
};

export default ErrorMessage;
