// frontend/src/components/NotificationPage.js
import React, { useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { format } from "date-fns";
import Header from "./Header";
import Footer from "./Footer";
import { useAdviceContext } from "../context/AdviceContext.js";
import ErrorMessage from "./ErrorMessage.js";

/**
 * O componente NotificationPage é responsável por exibir as notificações do sistema.
 */
const NotificationPage = () => {
  // Usando o contexto para acessar o estado e a função de obtenção de notificações
  const { state, getNotifications } = useAdviceContext();
  const { notificationList, error } = state;

  // Efeito para buscar as notificações ao montar o componente
  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  // Reverter a ordem das notificações para exibir a mais recente primeiro
  const reversedNotifications = [...notificationList].reverse();

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Componente Header para exibir o cabeçalho da página */}
        <Header title="Advice Slip Search" />
        <Container className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
          <h2 className="mb-4">Notifications</h2>
          <div className="mb-3">
            {/* Mapeamento das notificações para exibição */}
            {reversedNotifications.map((notification) => (
              <Card key={notification.id} className="mb-2">
                <Card.Body>
                  <Card.Title>
                    {/* Formatando a data da notificação */}
                    {format(
                      new Date(notification.createdAt),
                      "dd/MM/yyyy HH:mm:ss"
                    )}
                  </Card.Title>
                  <Card.Text>{notification.message}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
          {/* Exibir mensagem de erro, se houver */}
          {error && <ErrorMessage />}
        </Container>
        {/* Componente Footer para exibir o rodapé da página */}
        <Footer />
      </div>
    </>
  );
};

// Exporte o componente NotificationPage
export default NotificationPage;
