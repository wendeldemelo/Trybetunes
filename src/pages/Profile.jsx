import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
            <div>
              <div>
                <img data-testid="profile-image" src={ image } alt="user" />
                <h3>Nome</h3>
                <p>{ name }</p>
                <h4>
                  E-mail
                </h4>
                <p>{ email }</p>
                <h4>
                  Descrição
                </h4>
                <p>{ description }</p>
                <Link to="/profile/edit">
                  <p>
                    Editar perfil
                  </p>
                </Link>
              </div>
            </div>)}
      </div>
    );
  }
}

export default Profile;
