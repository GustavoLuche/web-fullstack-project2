import React from "react";
import Spinner from "react-bootstrap/Spinner";

// O componente "SpinnerLoading" exibe um spinner de carregamento enquanto os dados estão sendo carregados.
function SpinnerLoading() {
  return (
    <div className="App-spinner d-flex align-items-center justify-content-center h-100 m-4">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default SpinnerLoading;
