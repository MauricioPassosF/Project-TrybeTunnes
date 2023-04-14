import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchAlbuns extends Component {
  render() {
    const { searchedArtistAlbuns, searchedArtist } = this.props;
    return (
      <div>
        {
          searchedArtistAlbuns.length === 0 ? (
            <span>Nenhum álbum foi encontrado</span>
          ) : (
            <div>
              <h3>{ `Resultado de álbuns de: ${searchedArtist}` }</h3>
              <div>
                {searchedArtistAlbuns
                  .map(({ artistName, collectionName, collectionId, artworkUrl100 }) => (
                    <div key={ collectionId }>
                      <Link
                        data-testid={ `link-to-album-${collectionId}` }
                        to={ `album/${collectionId}` }
                      >
                        <img src={ artworkUrl100 } alt={ collectionName } />
                        <p>{collectionName}</p>
                        <p>{artistName}</p>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

SearchAlbuns.propTypes = ({
  searchedArtist: PropTypes.string,
  searchedArtistAlbuns: PropTypes.shape([]),
}).isRequired;

export default SearchAlbuns;
