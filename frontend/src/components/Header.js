import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuthContext } from "../context/AuthContext";

function Header({ title }) {
  const { performLogout } = useAuthContext();

  const handleLogout = () => {
    performLogout();
  };

  return (
    <Navbar expand="lg" className="App-header mb-3">
      <Container className="mb-1">
        <Navbar.Brand href="#home" className="text-white">
          {title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-white" href="#link">
              Insertion
            </Nav.Link>
            <Nav.Link className="text-white" href="#link">
              Search
            </Nav.Link>
            <Nav.Link className="text-white" href="#link">
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
