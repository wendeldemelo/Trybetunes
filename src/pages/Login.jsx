import React, { Component } from 'react';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import './Login.css';

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

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
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
      <form onSubmit={ this.handleSubmit }>
        <img
          className="mb-4"
          src="https://d29fhpw069ctt2.cloudfront.net/icon/image/37740/preview.svg"
          alt=""
          width="72"
          height="57"
        />
        <h3>Trybetunes</h3>
        <div className="mb-3">
          <label htmlFor="input-username">
            Nome do Usuário
            <input
              data-testid="login-name-input"
              id="input-username"
              type="text"
              onChange={ this.handleChange }
              value={ name }
              name="name"
              placeholder="Jane Doe"
              className="form-control"
            />
          </label>
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            data-testid="login-submit-button"
            disabled={ name.length < MIN_CARACTHERS }
          >
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

export default Login;
