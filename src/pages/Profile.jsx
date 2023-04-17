import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    loading: true,
    user: {},
  };

  async componentDidMount() {
    const userInfo = await getUser();
    this.setState({ user: userInfo,
      loading: false });
  }

  render() {
    const { loading, user } = this.state;
    const { name, email, image, description } = user;
    return (
      <div data-testid="page-profile">
        <Header />
        Teste Profile
        {
          loading ? (
            <p>Carregando...</p>
          ) : (
            <main>
              <img src={ image } alt={ name } data-testid="profile-image" />
              <div id="name">
                <h3>Name</h3>
                <p>{name}</p>
              </div>
              <div id="email">
                <h3>E-mail</h3>
                <p>{email}</p>
              </div>
              <div id="description">
                <h3>Description</h3>
                <p>{description}</p>
              </div>
              <Link to="/profile/edit">Editar perfil</Link>
            </main>
          )
        }

      </div>
    );
  }
}

export default Profile;
