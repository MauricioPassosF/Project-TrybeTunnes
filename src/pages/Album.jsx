import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    loading: false,
    musics: [],
    album: {},
    favoritesSongs: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    this.setState({ loading: true });
    this.getAlbumInfo(match.params.id);
    this.getFavorites();
    this.setState({ loading: false });
  }

  getFavorites = async () => {
    const list = await getFavoriteSongs();
    this.setState({
      favoritesSongs: list,
    });
  };

  getAlbumInfo = async (id) => {
    const albumInfo = await getMusics(`${id}`);
    this.setState({
      album: albumInfo[0],
      musics: albumInfo.filter((e, index) => index !== 0),
    });
  };

  render() {
    const { album, musics, loading, favoritesSongs } = this.state;
    const { collectionName, artworkUrl100, artistName } = album;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <main>
            <img src={ artworkUrl100 } alt={ collectionName } />
            <p data-testid="album-name">{collectionName}</p>
            <p data-testid="artist-name">{artistName}</p>
            {musics
              // .filter((e, index) => (index === 0))
              .map((musicInfo, index) => (
                <MusicCard
                  fatherPage="album"
                  key={ index }
                  musicInfo={ musicInfo }
                  favorite={ favoritesSongs
                    .some(({ trackId }) => (
                      // console.log(trackId === musicInfo.trackId))) }
                      trackId === musicInfo.trackId)) }
                />
              ))}
          </main>
        )}
      </div>
    );
  }
}

Album.propTypes = ({
  match: PropTypes.shape({}) }).isRequired;

export default Album;
