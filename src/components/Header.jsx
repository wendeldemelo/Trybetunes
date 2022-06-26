import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
    };

    this.userHeader = this.userHeader.bind(this);
  }

  componentDidMount() {
    this.userHeader();
  }

  userHeader() {
    this.setState({ loading: true });
    getUser()
      .then((response) => this.setState({ name: response.name, loading: false }));
  }

  render() {
    const { name, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="header-component">
        <header data-testid="header-user-name">
          <p>Usuário:</p>
          <p>{ name }</p>
        </header>
        <nav>
          <ul>
            <Link to="/search">
              <li data-testid="link-to-search">Search</li>
            </Link>
            <Link to="/favorites">
              <li data-testid="link-to-favorites">Favorites</li>
            </Link>
            <Link to="/profile">
              <li data-testid="link-to-profile">Profile</li>
            </Link>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
