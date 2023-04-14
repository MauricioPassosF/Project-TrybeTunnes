import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    inputLoginName: '',
    loading: false,
  };

  handlerInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handlerButton = async (history) => {
    const { inputLoginName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: inputLoginName });
    this.setState({ loading: false });
    history.push('/search');
  };

  // verifyLoading = () => {
  //   const { loading, clickRequest } = this.state;
  //   if (clickRequest) {
  //     return !loading ? <Redirect to="/search" /> : <p>loading</p>;
  //   }
  // };

  // test = (user) => {
  //   console.log(user);
  // };

  render() {
    const { inputLoginName, loading } = this.state;
    const minNameLength = 3;
    const { history } = this.props;

    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <label htmlFor="inputLoginName">
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="Digite nome do usuário"
            name="inputLoginName"
            id="inputLoginName"
            onChange={ this.handlerInput }
            value={ inputLoginName }
          />
        </label>
        <button
          data-testid="login-submit-button"
          disabled={ (inputLoginName.length < minNameLength) }
          // onClick={ () => this.test({ name: inputLoginName }) }
          onClick={ () => this.handlerButton(history) }
        >
          Entrar
        </button>
        <div>
          {
            loading ? (
              <p>Carregando...</p>
            ) : (
              <p> </p>
            )
          }
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Login;
