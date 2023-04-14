import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    loading: true,
    musics: [],
    album: {},
  };

  async componentDidMount() {
    const { match } = this.props;
    this.getAlbumInfo(match.params.id);
  }

  getAlbumInfo = async (state) => {
    const albumInfo = await getMusics(`${state}`);
    this.setState({
      album: albumInfo[0],
      musics: albumInfo.filter((e, index) => index !== 0),
      loading: false,
    });
  };

  render() {
    const { album, musics, loading } = this.state;
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
            {musics.map((musicInfo, index) => (
              <MusicCard key={ index } musicInfo={ musicInfo } />
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
