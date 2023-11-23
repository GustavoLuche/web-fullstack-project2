import React from "react";

// O componente Header exibe um título na parte superior da aplicação.
function Header({ title }) {
  return (
    <header className="App-header mb-3 py-2">
      <h1 className="text-center">{title}</h1>
    </header>
  );
}

export default Header;
