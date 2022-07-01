import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

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
      <div>
        <Header />
        {loading
          ? <Loading />
          : (
            <section data-testid="page-profile-edit">
              <form onSubmit={ this.handleSubmit }>
                <div className="mb-3">
                  <label htmlFor="edit-input-image">
                    Foto
                    <input
                      id="edit-input-image"
                      type="text"
                      onChange={ this.handleChange }
                      className="form-control"
                      data-testid="edit-input-image"
                      value={ image }
                      name="image"
                      placeholder="Url da imagem"
                    />
                  </label>
                  <label htmlFor="edit-input-username">
                    Nome do Usuário
                    <input
                      id="edit-input-username"
                      type="text"
                      onChange={ this.handleChange }
                      className="form-control"
                      data-testid="edit-input-name"
                      value={ name }
                      name="name"
                      placeholder="Jane Doe"
                    />
                  </label>
                  <label htmlFor="edit-input-email">
                    E-mail
                    <input
                      id="edit-input-email"
                      type="email"
                      className="form-control"
                      data-testid="edit-input-email"
                      value={ email }
                      name="email"
                      placeholder="janedoe@exemplo.com"
                      onChange={ this.handleChange }
                    />
                  </label>
                  <label htmlFor="edit-input-description">
                    Descrição
                    <textarea
                      id="edit-input-description"
                      className="form-control"
                      data-testid="edit-input-description"
                      value={ description }
                      type="text"
                      name="description"
                      onChange={ this.handleChange }
                    />
                  </label>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary"
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
                  </button>
                </div>
              </form>
            </section>
          )}
        { formFulfilled && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
