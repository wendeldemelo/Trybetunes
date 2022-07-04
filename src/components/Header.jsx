import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import logo from '../logo.png';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      image: '',
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
      .then((response) => this.setState({
        name: response.name,
        image: response.image,
        loading: false,
      }));
  }

  render() {
    const { name, image, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <Navbar bg="dark" variant="dark" data-testid="header-component">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={ logo }
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {' '}
            Trybetunes
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end" />
          <Nav className="me-auto">
            <Link to="/search">
              <Button
                variant="dark"
                data-testid="link-to-search"
                size="sm"
              >
                Buscar
              </Button>
            </Link>
            <Link to="/favorites">
              <Button
                variant="dark"
                data-testid="link-to-favorites"
                size="sm"
              >
                Favoritos
              </Button>
            </Link>
          </Nav>
          <Link to="/profile">
            <Navbar.Brand data-testid="link-to-profile">
              <img
                alt={ name }
                src={ image }
                width="30"
                height="30"
                className="d-inline-block align-top rounded"
              />
              <span
                className="visually-hidden"
                data-testid="header-user-name"
              >
                <p>{ name }</p>
              </span>
            </Navbar.Brand>
          </Link>

        </Container>
      </Navbar>
    );
  }
}

export default Header;
