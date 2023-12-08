// frontend/src/components/InsertionPage.js
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import { useAdviceContext } from "../context/AdviceContext";
import ErrorMessage from "./ErrorMessage";

/**
 * O componente InsertionPage é responsável por fornecer uma interface para inserção de novos conselhos.
 */
const InsertionPage = () => {
  // Usando o contexto para acessar o estado e a função de inserção
  const { state, insertAdvice } = useAdviceContext();
  const { error } = state;

  // Estado para armazenar o texto do conselho inserido
  const [adviceText, setAdviceText] = useState("");

  /**
   * Função para lidar com a submissão do formulário.
   * @param {Event} event - O evento de submissão do formulário.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Lógica para enviar o conselho para o banco de dados
    insertAdvice(adviceText);

    // Limpar o campo de texto após a submissão
    setAdviceText("");
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Componente Header para a barra de navegação */}
        <Header title="Advice Slip Search" />

        {/* Container principal */}
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

          {/* Exibe ErrorMessage em caso de erro */}
          {error && <ErrorMessage />}
        </Container>

        {/* Componente Footer para o rodapé da aplicação */}
        <Footer />
      </div>
    </>
  );
};

export default InsertionPage;
