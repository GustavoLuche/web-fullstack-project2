import React from "react";
import { useAdviceContext } from "../context/AdviceContext";

// O componente "SearchInfo" exibe informações sobre a pesquisa, incluindo o termo de busca e o número de resultados encontrados.
function SearchInfo() {
  // Usando o contexto para acessar o estado
  const { state } = useAdviceContext();
  const { adviceList, searchTerm } = state;

  return (
    <div className="App-search-info mb-3">
      <p className="mb-2">
        <strong>Search Term:</strong> {searchTerm}{" "}
      </p>
      <p className="m-0">
        {adviceList.length === 1
          ? "1 result found."
          : `${adviceList.length} results found.`}
      </p>
    </div>
  );
}

export default SearchInfo;
