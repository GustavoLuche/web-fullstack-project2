// frontend/src/components/InsertionPage.js
// Importe as bibliotecas necessárias do React e do React Bootstrap
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";

// Defina o componente InsertionPage
const InsertionPage = () => {
  // Estado para armazenar o texto do conselho inserido
  const [adviceText, setAdviceText] = useState("");

  // Função para lidar com a submissão do formulário
  const handleSubmit = (event) => {
    event.preventDefault();

    // Lógica para enviar o conselho para o banco de dados (você precisará implementar isso)
    console.log("Advice Text:", adviceText);

    // Limpar o campo de texto após a submissão
    setAdviceText("");
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
          <Header title="Advice Slip Search" />
          <Container className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-4">Insert Advice</h2>
            {/* Formulário para inserir conselhos */}
            <Form onSubmit={handleSubmit} className="w-100">
              <Form.Group controlId="adviceText" className="text-center">
                <Form.Label>Advice Text</Form.Label>
                {/* Campo de texto para inserir o texto do conselho */}
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={adviceText}
                  onChange={(e) => setAdviceText(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                {/* Botão de envio do formulário */}
                <Button variant="primary" type="submit" className="mt-3">
                  Insert Advice
                </Button>
              </div>
            </Form>
          </Container>
          <Footer />
      </div>
    </>
  );
};

// Exporte o componente InsertionPage
export default InsertionPage;
