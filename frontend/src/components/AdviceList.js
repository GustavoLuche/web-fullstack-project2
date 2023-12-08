// frontend/src/components/AdviceList.js
import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types"; // Importe PropTypes para validar as propriedades
import { useAdviceContext } from "../context/AdviceContext";

// O componente "AdviceList" é responsável por exibir a lista de conselhos em cartões.
function AdviceList() {
  // Usando o contexto para acessar o estado
  const { state } = useAdviceContext();
  const { adviceList, currentPage, itemsPerPage } = state;

  // Calcular o índice do primeiro item na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Filtrar a lista de conselhos para exibir apenas os itens da página atual
  const adviceListToDisplay = adviceList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="App-list mb-3">
      {adviceListToDisplay.map((advice, index) => (
        <Card key={advice.id} className="mb-2">
          <Card.Body>
            <Card.Text>
              <strong>{startIndex + index + 1}. </strong>
              {advice.advice}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

// Defina PropTypes para garantir a integridade das propriedades
AdviceList.propTypes = {
  adviceList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      advice: PropTypes.string.isRequired,
    })
  ),
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};

export default AdviceList;
