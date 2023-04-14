import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    userName: '',
  };

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userInfo = await getUser();
    this.setState({ userName: userInfo.name });
  };

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        {
          userName ? (
            <>
              <h1>TrybeTunes</h1>
              <h3 data-testid="header-user-name">{userName}</h3>
            </>
          ) : (
            <p>Carregando...</p>
          )
        }
      </header>
    );
  }
}

export default Header;
