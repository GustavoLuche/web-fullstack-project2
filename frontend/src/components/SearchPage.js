// frontend/src/components/SearchPage.js
import React from "react";
import PropTypes from "prop-types"; // Importe o PropTypes para documentar as propriedades necessárias
import Header from "./Header";
import Greeting from "./Greeting";
import Search from "./Search";
import SpinnerLoading from "./SpinnerLoading";
import ErrorMessage from "./ErrorMessage";
import SearchInfo from "./SearchInfo";
import Paginator from "./Paginator";
import AdviceList from "./AdviceList.js";
import Footer from "./Footer";
import { useAdviceContext } from "../context/AdviceContext.js";
import "../App.css";

/**
 * O componente SearchPage representa a página de pesquisa da aplicação.
 * Ele inclui cabeçalho, saudação, campo de pesquisa, indicação de carregamento,
 * mensagens de erro, informações de pesquisa, paginação e a lista de conselhos.
 */
function SearchPage() {
  // Usando o contexto para acessar o estado
  const { state } = useAdviceContext();
  const { error, isLoading, searchTerm, searchPerformed } = state;

  return (
    <div className="App">
      <Header title="Advice Slip Search" />
      <Greeting />
      <div
        className={`App-container container ${
          searchPerformed ? "" : "no-search-performed"
        }`}
      >
        <Search />
        {isLoading && <SpinnerLoading />}
        {!isLoading && !error && searchTerm !== "" && (
          <>
            <SearchInfo />
            <Paginator />
            <AdviceList />
          </>
        )}
        {error && !isLoading && <ErrorMessage />}
      </div>
      <Footer />
    </div>
  );
}

// Adicione PropTypes para documentar as propriedades
SearchPage.propTypes = {
  state: PropTypes.shape({
    error: PropTypes.string,
    isLoading: PropTypes.bool,
    searchTerm: PropTypes.string,
    searchPerformed: PropTypes.bool,
  }),
};

export default SearchPage;
