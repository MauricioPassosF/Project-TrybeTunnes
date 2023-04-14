import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    inputArtist: '',
  };

  handlerInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { inputArtist } = this.state;
    const minArtistLength = 2;

    return (
      <div data-testid="page-search">
        <Header />
        Teste Search
        <label htmlFor="inputArtist">
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Artista desejado"
            name="inputArtist"
            id="inputArtist"
            onChange={ this.handlerInput }
            value={ inputArtist }
          />
        </label>
        <button
          data-testid="search-artist-button"
          disabled={ (inputArtist.length < minArtistLength) }
          // onClick={ () => this.handlerButton(history) }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
