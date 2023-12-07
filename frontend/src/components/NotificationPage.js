// frontend/src/components/NotificationPage.js
// Importe as bibliotecas necessárias do React e do React Bootstrap
import React, { useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { format } from "date-fns";
import Header from "./Header";
import Footer from "./Footer";
import { useAdviceContext } from "../context/AdviceContext.js";
import ErrorMessage from "./ErrorMessage.js";

// Defina o componente NotificationPage
const NotificationPage = () => {
  const { state, getNotifications } = useAdviceContext();
  const { notificationList, error } = state;

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const reversedNotifications = [...notificationList].reverse();

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header title="Advice Slip Search" />
        <Container className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
          <h2 className="mb-4">Notifications</h2>
          <div className="mb-3">
            {reversedNotifications.map((notification) => (
              <Card key={notification.id} className="mb-2">
                <Card.Body>
                  <Card.Title>
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
          {error && <ErrorMessage />}
        </Container>
        <Footer />
      </div>
    </>
  );
};

// Exporte o componente NotificationPage
export default NotificationPage;
