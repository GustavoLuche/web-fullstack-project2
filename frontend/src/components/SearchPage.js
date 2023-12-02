// frontend/src/components/SearchPage.js
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

export default SearchPage;
