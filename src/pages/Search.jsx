import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import SearchAlbuns from '../components/SearchAlbuns';

class Search extends Component {
  state = {
    inputArtist: '',
    loading: false,
    searchedArtist: '',
    searchedArtistAlbuns: [],
  };

  handlerInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handlerButton = async () => {
    const { inputArtist } = this.state;
    this.setState({ loading: true });
    const response = await searchAlbumsAPI(inputArtist);
    this.setState({ loading: false,
      searchedArtist: inputArtist,
      searchedArtistAlbuns: response,
      inputArtist: '',
    });
  };

  render() {
    const { inputArtist, loading, searchedArtist, searchedArtistAlbuns } = this.state;
    const minArtistLength = 2;

    return (
      <div data-testid="page-search">
        <Header />
        {
          loading ? (
            <p>Carregando...</p>
          ) : (
            <div>
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
                onClick={ () => this.handlerButton() }
              >
                Pesquisar
              </button>
            </div>
          )
        }
        {searchedArtist ? (<SearchAlbuns
          searchedArtistAlbuns={ searchedArtistAlbuns }
          searchedArtist={ searchedArtist }
        />)
          : (<> </>) }
      </div>
    );
  }
}

export default Search;
