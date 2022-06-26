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
            <div data-testid="page-profile-edit">
              <form onSubmit={ this.handleSubmit }>
                <img src={ image } alt={ name } />
                <input
                  data-testid="edit-input-image"
                  value={ image }
                  type="text"
                  name="image"
                  onChange={ this.handleChange }
                />
                <p>Nome:</p>
                <input
                  data-testid="edit-input-name"
                  value={ name }
                  type="text"
                  name="name"
                  onChange={ this.handleChange }
                />
                <p>E-mail:</p>
                <input
                  data-testid="edit-input-email"
                  value={ email }
                  type="text"
                  name="email"
                  onChange={ this.handleChange }
                />
                <p>Descrição:</p>
                <textarea
                  data-testid="edit-input-description"
                  value={ description }
                  type="text"
                  name="description"
                  onChange={ this.handleChange }
                />
                <button
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
              </form>
            </div>
          )}
        { formFulfilled && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
