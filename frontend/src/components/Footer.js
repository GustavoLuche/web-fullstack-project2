import React from "react";

// O componente "Footer" é responsável por exibir o rodapé da aplicação.
function Footer() {
  return (
    <footer className="App-footer py-3">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Gustavo Luche</p>
      </div>
    </footer>
  );
}

export default Footer;
