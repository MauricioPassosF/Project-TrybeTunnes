import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    loading: true,
    editImage: '',
    editName: '',
    editEmail: '',
    editDescription: '',
    buttonDisable: true,
  };

  async componentDidMount() {
    const userInfo = await getUser();
    this.setState({
      loading: false,
      editImage: userInfo.image,
      editName: userInfo.name,
      editEmail: userInfo.email,
      editDescription: userInfo.description,
    }, () => this.buttonValidation());
  }

  verifyFilling = (text) => (text !== '');

  verifyAllFilling = () => {
    console.log('oi');
    const { editImage, editName, editEmail, editDescription } = this.state;
    let result;
    if (this.verifyFilling(editImage)
    && this.verifyFilling(editName)
    && this.verifyFilling(editEmail)
    && this.verifyFilling(editDescription)) {
      result = true;
    } else {
      result = false;
    }
    return result;
  };
  // Peguei do seguinte site a validacao por email: https://www.devmedia.com.br/validando-e-mail-em-inputs-html-com-javascript/26427

  emailValidation = () => {
    const { editEmail } = this.state;
    const minUser = 3;
    const minus1 = -1;
    const user = editEmail.substring(0, editEmail.indexOf('@'));
    const dom = editEmail.substring(editEmail.indexOf('@') + 1, editEmail.length);
    return ((user.length >= 1)
    && (dom.length >= minUser)
    && (user.search('@') === minus1)
    && (dom.search('@') === minus1)
    && (user.search(' ') === minus1)
    && (dom.search(' ') === minus1)
    && (dom.search('.') !== minus1)
    && (dom.indexOf('.') >= 1)
    && (dom.lastIndexOf('.') < dom.length - 1));
  };

  buttonValidation = () => {
    if (this.emailValidation() && this.verifyAllFilling()) {
      this.setState({
        buttonDisable: false,
      });
    }
  };

  handlerInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.buttonValidation());
  };

  handlerButton = async (history) => {
    const { editImage, editName, editEmail, editDescription } = this.state;
    const user = {
      name: editName,
      email: editEmail,
      image: editImage,
      description: editDescription,
    };
    this.setState({ loading: true });
    await updateUser(user);
    this.setState({ loading: false });
    history.push('/profile');
  };

  render() {
    const { loading, editImage, editName,
      editEmail, editDescription, buttonDisable } = this.state;
    const { history } = this.props;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        Teste ProfileEdit
        {
          loading ? (
            <p>Carregando...</p>
          ) : (
            <main>
              <label htmlFor="editImage">
                <input
                  type="text"
                  data-testid="edit-input-image"
                  placeholder="Digite url da foto"
                  name="editImage"
                  id="editImage"
                  onChange={ this.handlerInput }
                  value={ editImage }
                />
              </label>
              <label htmlFor="editName">
                <input
                  type="text"
                  data-testid="edit-input-name"
                  placeholder="Digite nome"
                  name="editName"
                  id="editName"
                  onChange={ this.handlerInput }
                  value={ editName }
                />
              </label>
              <label htmlFor="editEmail">
                <input
                  type="text"
                  data-testid="edit-input-email"
                  placeholder="Digite e-mail"
                  name="editEmail"
                  id="editEmail"
                  onChange={ this.handlerInput }
                  value={ editEmail }
                />
              </label>
              <label htmlFor="editDescription">
                <input
                  type="text"
                  data-testid="edit-input-description"
                  placeholder="Digite a descrricao"
                  name="editDescription"
                  id="editDescription"
                  onChange={ this.handlerInput }
                  value={ editDescription }
                />
              </label>
              <button
                data-testid="edit-button-save"
                disabled={ buttonDisable }
                onClick={ () => this.handlerButton(history) }
              >
                Salvar
              </button>
            </main>
          )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = ({
  history: PropTypes.shape({}),
}).isRequired;

export default ProfileEdit;
