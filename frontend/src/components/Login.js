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
import authService from "../services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const result = await authService.login(username, password);
      // Lógica adicional após o login bem-sucedido (redirecionamento, armazenamento de token, etc.)
      console.log("Login bem-sucedido!", result);
    } catch (error) {
      // Lidar com erros de login (exibir mensagem de erro, etc.)
      console.error("Erro durante o login:", error.message);
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
                <InputGroup controlId="formBasicUsername" className="mt-4">
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

                <Form.Group controlId="formBasicCheckbox" className="mt-2">
                  <p className="small">
                    <a className="text-primary" href="#!">
                      Forgot password?
                    </a>
                  </p>
                </Form.Group>

                <div
                  className="d-flex justify-content-center align-items-center"
                  onClick={handleLogin}
                >
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </Form>

              <p className="mt-3 text-center">
                Don't have an account?{" "}
                <a href="#" className="text-primary fw-bold">
                  Sign Up
                </a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
