import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import './Login.css';
import logo from '../logo.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loggedIn: false,
      formFulfilled: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  async handleSubmit() {
    const { name } = this.state;
    this.setState({ loggedIn: true });
    await createUser({ name });
    this.setState({
      loggedIn: false,
      formFulfilled: true,
    });
  }

  render() {
    const { name, loggedIn, formFulfilled } = this.state;
    const MIN_CARACTHERS = 3;
    if (loggedIn) return <Loading />;
    if (formFulfilled) return <Redirect to="/search" />;
    return (
      <Container
        data-testid="page-login"
        className="container-login"
      >
        <Row>
          <Col>
            <img
              alt=""
              src={ logo }
              width="150"
              height="150"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Trybetunes</h3>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="3">
            <Form onSubmit={ this.handleSubmit }>
              <Form.Group className="mb-3" controlId="input-username">
                <Form.Label>Nome do usuário</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Jane Doe"
                  data-testid="login-name-input"
                  onChange={ this.handleChange }
                  value={ name }
                  name="name"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                data-testid="login-submit-button"
                disabled={ name.length < MIN_CARACTHERS }
              >
                Entrar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
