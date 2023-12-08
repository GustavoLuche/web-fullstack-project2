// frontend/src/components/Paginator.js
import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { useAdviceContext } from "../context/AdviceContext";

/**
 * O componente Paginator é responsável pela paginação dos resultados da pesquisa.
 */
function Paginator() {
  // Usando o contexto para acessar o estado e funções relacionadas à paginação
  const { state, handlePageChange } = useAdviceContext();
  const { adviceList, currentPage, itemsPerPage } = state;

  // Calcula o número total de páginas com base na lista de conselhos e itens por página
  const totalPages = Math.ceil(adviceList.length / itemsPerPage);

  // Define o número máximo de itens de paginação a serem exibidos
  const maxItems = 5;
  let startItem, endItem;

  // Calcula o intervalo de itens de paginação a serem exibidos
  if (totalPages <= maxItems) {
    startItem = 1;
    endItem = totalPages;
  } else {
    const halfMax = Math.floor(maxItems / 2);

    // Se a página atual estiver próxima ao início
    if (currentPage <= halfMax + 1) {
      startItem = 1;
      endItem = maxItems - 1;
    } else if (currentPage >= totalPages - halfMax) {
      // Se a página atual estiver próxima ao final
      startItem = totalPages - maxItems + 2;
      endItem = totalPages;
    } else {
      // Se a página atual estiver no meio
      startItem = currentPage - halfMax;
      endItem = currentPage + halfMax;
    }
  }

  // Cria um array de páginas para renderizar
  const pages = Array.from(
    { length: endItem - startItem + 1 },
    (_, index) => startItem + index
  );

  return (
    <div className="App-paginator d-flex justify-content-center mb-3">
      <Pagination className="m-0">
        {startItem > 1 && (
          <Pagination.First onClick={() => handlePageChange(1)} />
        )}
        {startItem > 2 && <Pagination.Ellipsis disabled />}
        {pages.map((page) => (
          <Pagination.Item
            key={page}
            active={currentPage === page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}
        {endItem < totalPages - 1 && <Pagination.Ellipsis disabled />}
        {endItem < totalPages && (
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        )}
      </Pagination>
    </div>
  );
}

export default Paginator;
