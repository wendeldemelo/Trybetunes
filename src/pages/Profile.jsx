import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './Profile.css';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: {},
    };
    this.showUser = this.showUser.bind(this);
  }

  componentDidMount() {
    this.showUser();
  }

  showUser() {
    this.setState({ loading: true });
    getUser()
      .then((user) => this.setState({
        user,
        loading: false,
      }));
  }

  render() {
    const { user: { name, email, image, description } } = this.state;
    const { loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading
          ? <Loading />
          : (
            <Container className="profile">
              <Card style={ { width: '20rem' } }>
                <Card.Img
                  variant="top"
                  src={ image }
                  alt="user-img"
                  data-testid="profile-image"
                />
                <Card.Body>
                  <Card.Title>{ name }</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{ email }</Card.Subtitle>
                  <Card.Text>
                    { description }
                  </Card.Text>
                  <Link to="/profile/edit">
                    <Button
                      variant="primary"
                      data-testid="profile-edit-btn"
                    >
                      Editar Perfil
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Container>)}
      </div>
    );
  }
}

export default Profile;

/* <Container>
<Card style={{ width: '30rem' }}>
  <Card.Img variant="top" src={ image } alt="user-img" data-testid="profile-image"/>
  <Card.Body>
    <Card.Title>{ name }</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">{ email }</Card.Subtitle>
    <Card.Text>
    { description }
    </Card.Text>
    <Card.Link href="/profile/edit">
    <Button variant="primary">Editar Perfil</Button>
    </Card.Link>
  </Card.Body>
</Card>
</Container> */
