// frontend/src/components/HomePage.js
import React from "react";
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
 * O componente HomePage é a página principal da aplicação.
 */
function HomePage() {
  // Usando o contexto para acessar o estado
  const { state } = useAdviceContext();
  const { error, isLoading, searchTerm, searchPerformed } = state;

  return (
    <div className="App">
      {/* Componente Header para a barra de navegação */}
      <Header title="Advice Slip Search" />

      {/* Componente Greeting para a mensagem de boas-vindas */}
      <Greeting />

      {/* Contêiner principal */}
      <div
        className={`App-container container ${
          searchPerformed ? "" : "no-search-performed"
        }`}
      >
        {/* Componente Search para a barra de pesquisa */}
        <Search />

        {/* Exibe o SpinnerLoading durante o carregamento */}
        {isLoading && <SpinnerLoading />}

        {/* Exibe SearchInfo, Paginator e AdviceList quando a pesquisa é concluída */}
        {!isLoading && !error && searchTerm !== "" && (
          <>
            <SearchInfo />
            <Paginator />
            <AdviceList />
          </>
        )}

        {/* Exibe ErrorMessage em caso de erro */}
        {error && !isLoading && <ErrorMessage />}
      </div>

      {/* Componente Footer para o rodapé da aplicação */}
      <Footer />
    </div>
  );
}

export default HomePage;
