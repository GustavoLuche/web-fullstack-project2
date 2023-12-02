// frontend/src/components/Login.js
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useAuthContext } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { performLogin } = useAuthContext();

  const handleLogin = async () => {
    try {
      const result = await performLogin(username, password);

      // Você pode adicionar lógica adicional aqui com base no resultado do login
      if (result) {
        console.log("Login bem-sucedido:", result);

        // Redirecionar ou realizar outras ações necessárias após o login
      } else {
        console.log("Login falhou");
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row>
        <Col md={12} lg={12} xs={12}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="fw-bold mb-2 text-uppercase text-center">Login</h2>
              <Form>
                <InputGroup className="mt-4">
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  <Form.Control
                    type="username"
                    placeholder="Enter username"
                    aria-describedby="basic-addon1"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <Button onClick={handleLogin} variant="primary" type="button">
                    Login
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
