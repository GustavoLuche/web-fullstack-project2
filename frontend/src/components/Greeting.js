import React from "react";

// O componente Greeting exibe uma mensagem de boas-vindas na aplicação.
function Greeting() {
  return (
    <div className="App-greeting mb-4">
      <h2 className="text-center">Welcome to the Advice Slip Search</h2>
      <p className="text-center m-0">
        Get advice on various topics. Start by entering a search term below.
      </p>
    </div>
  );
}

export default Greeting;
