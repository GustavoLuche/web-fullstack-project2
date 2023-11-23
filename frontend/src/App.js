import React from "react";
import Header from "./components/Header";
import Greeting from "./components/Greeting";
import Search from "./components/Search";
import SpinnerLoading from "./components/SpinnerLoading";
import ErrorMessage from "./components/ErrorMessage";
import SearchInfo from "./components/SearchInfo";
import Paginator from "./components/Paginator";
import AdviceList from "./components/AdviceList.js";
import Footer from "./components/Footer";
import { useAdviceContext } from "./context/AdviceContext";
import "./App.css";

function App() {
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

export default App;
