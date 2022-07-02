import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import logo from '../logo.png';

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
      <Navbar bg="dark" variant="dark">
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
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Usuário:
              {' '}
              { name }
            </Navbar.Text>
          </Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/search">Buscar</Nav.Link>
            <Nav.Link href="/favorites">Favoritos</Nav.Link>
            <Nav.Link href="/profile">Perfil</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
