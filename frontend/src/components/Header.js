// frontend/src/components/Header.js
import React from "react";
import PropTypes from "prop-types"; // Importe PropTypes para validar as propriedades.
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuthContext } from "../context/AuthContext";
import { useAdviceContext } from "../context/AdviceContext.js";

/**
 * O componente Header exibe a barra de navegação superior da aplicação.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.title - O título exibido na barra de navegação.
 */
function Header({ title }) {
  // Use o contexto para acessar funções e estado relacionados à autenticação e aos conselhos
  const { performLogout, checkTokenValidity } = useAuthContext();
  const { changePage } = useAdviceContext();

  // Lidar com o clique no botão de logout
  const handleLogout = () => {
    performLogout();
  };

  // Lidar com o clique em uma navegação de página
  const handleNavClick = (page) => {
    checkTokenValidity();
    changePage(page);
  };

  return (
    <Navbar expand="lg" className="App-header mb-3">
      <Container className="mb-1">
        <Navbar.Brand
          className="text-white"
          onClick={() => handleNavClick("home")}
        >
          {title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className="text-white"
              onClick={() => handleNavClick("insertion")}
            >
              Insertion
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => handleNavClick("search")}
            >
              Search
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => handleNavClick("notification")}
            >
              Notification
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// Defina as PropTypes para garantir a integridade das propriedades.
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
