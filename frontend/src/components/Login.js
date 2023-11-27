// Login.js
import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function Login() {
  return (
    <Container className=" d-flex justify-content-center align-items-center">
      <Row>
        <Col md={12} lg={12} xs={12}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="fw-bold mb-2 text-uppercase text-center">Login</h2>
              <Form>
                <Form.Group controlId="formBasicEmail" className="mt-4">
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox" className="mt-2">
                  <p className="small">
                    <a className="text-primary" href="#!">
                      Forgot password?
                    </a>
                  </p>
                </Form.Group>

                <div className="d-flex justify-content-center align-items-center">
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
