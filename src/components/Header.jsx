import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Nav, Container, Navbar } from 'react-bootstrap';
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
        <Navbar bg="light" variant="light" fixed="top">
          <Container>
            <Navbar.Brand href="/">
              <img
                className="mb-4"
                src="https://d29fhpw069ctt2.cloudfront.net/icon/image/37740/preview.svg"
                alt=""
                width="72"
                height="57"
              />
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
              <Nav.Link href="/search" data-testid="link-to-search">Buscar</Nav.Link>
              <Nav.Link
                href="/favorites"
                data-testid="link-to-favorites"
              >
                Favoritos
              </Nav.Link>
              <Nav.Link href="/profile" data-testid="link-to-profile">Perfil</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
