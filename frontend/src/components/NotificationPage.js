// frontend/src/components/NotificationPage.js
// Importe as bibliotecas necessárias do React e do React Bootstrap
import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";

// Defina o componente NotificationPage
const NotificationPage = () => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header title="Advice Slip Search" />
        <Container className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
          <h2 className="mb-4">Notifications</h2>
        </Container>
        <Footer />
      </div>
    </>
  );
};

// Exporte o componente NotificationPage
export default NotificationPage;
