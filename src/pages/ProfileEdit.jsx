import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      formFulfilled: false,
      user: {},
    };
    this.getUserFromApi = this.getUserFromApi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getUserFromApi();
  }

  handleChange({ target: { name, value } }) {
    this.setState(({ user }) => ({ user: { ...user, [name]: value } }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user: { name, email, image, description } } = this.state;
    updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState({ formFulfilled: true, loading: false });
  }

  getUserFromApi() {
    getUser()
      .then((user) => this.setState({
        user,
        loading: false,
      }));
  }

  render() {
    const { loading, formFulfilled } = this.state;
    const { user: { name, image, email, description } } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading
          ? <Loading />
          : (
            <Container
              className="profile-edit-container"
            >
              <Row>
                <Col>
                  <Col>
                    <img
                      width="150"
                      height="150"
                      src={ image }
                      alt={ name }
                    />
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col xs lg="3">
                  <Form onSubmit={ this.handleSubmit } className="form-profile-edit">
                    <Form.Group className="mb-3" controlId="input-edit-img">
                      <Form.Label>Foto de perfil *</Form.Label>
                      <Form.Control
                        data-testid="edit-input-image"
                        value={ image }
                        type="text"
                        name="image"
                        onChange={ this.handleChange }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="input-edit-username">
                      <Form.Label>Nome do usuário *</Form.Label>
                      <Form.Control
                        data-testid="edit-input-name"
                        value={ name }
                        type="text"
                        name="name"
                        onChange={ this.handleChange }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="input-edit-email">
                      <Form.Label>E-mail *</Form.Label>
                      <Form.Control
                        type="text"
                        data-testid="edit-input-email"
                        value={ email }
                        name="email"
                        onChange={ this.handleChange }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="input-description">
                      <Form.Label>Descrição *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={ 4 }
                        data-testid="edit-input-description"
                        value={ description }
                        type="text"
                        name="description"
                        onChange={ this.handleChange }
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      data-testid="edit-button-save"
                      type="submit"
                      disabled={
                        name.length === 0
                    || email.length === 0
                    || image.length === 0
                    || description.length === 0
                      }
                    >
                      Salvar
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          )}
        { formFulfilled && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
