// frontend/src/components/Header.js
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuthContext } from "../context/AuthContext";
import { useAdviceContext } from "../context/AdviceContext.js";

function Header({ title }) {
  const { performLogout } = useAuthContext();
  const { changePage } = useAdviceContext();

  const handleLogout = () => {
    performLogout();
  };

  const handleNavClick = (page) => {
    debugger;
    changePage(page);
    debugger;
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

export default Header;
