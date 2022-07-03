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
      image: '',
      email: '',
      description: '',
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
    const { name, email, description } = this.state;
    let { image } = this.state;
    this.setState({ loggedIn: true });
    if (!image || image === '') {
      image = 'https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png';
    }
    await createUser({ name, image, email, description });
    this.setState({
      loggedIn: false,
      formFulfilled: true,
    });
  }

  render() {
    const { name, image, email, description, loggedIn, formFulfilled } = this.state;
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
                <Form.Label>Nome do usuário *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Jane Doe"
                  data-testid="login-name-input"
                  onChange={ this.handleChange }
                  value={ name }
                  name="name"
                />
                <Form.Text className="text-muted">
                  Seu nome de usuário deve conter no mínimo 3 caracteres.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="input-email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="janedoe@gmail.com"
                  data-testid="login-email-input"
                  onChange={ this.handleChange }
                  value={ email }
                  name="email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="input-img">
                <Form.Label>Foto de perfil</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="URL da imagem"
                  data-testid="login-img-input"
                  onChange={ this.handleChange }
                  value={ image }
                  name="image"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="input-description">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={ 4 }
                  placeholder="Sou uma desconhecida, tentando me encontrar."
                  data-testid="login-description-input"
                  onChange={ this.handleChange }
                  value={ description }
                  name="description"
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
