import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

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
      <div data-testid="page-login">
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="input-name">
            <input
              data-testid="login-name-input"
              type="text"
              onChange={ this.handleChange }
              value={ name }
              name="name"
              placeholder="Nome"
            />
          </label>
          <label htmlFor="input-button">
            <input
              data-testid="login-submit-button"
              type="submit"
              value="Entrar"
              disabled={ name.length < MIN_CARACTHERS }
            />
          </label>
        </form>
      </div>
    );
  }
}

export default Login;
