import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isFavorite: false,
    loading: false,
  };

  helperHandler = async (musicInfo) => {
    await addSong(musicInfo);
    this.setState({
      loading: false });
  };

  handlerInput = ({ target }, musicInfo) => {
    const { name, checked } = target;
    if (checked) {
      this.setState({
        [name]: checked,
        loading: true,
      }, () => this.helperHandler(musicInfo));
    } else {
      this.setState({
        [name]: checked });
    }
  };

  render() {
    const { musicInfo } = this.props;
    const { trackName, previewUrl, trackId } = musicInfo;
    const { isFavorite, loading } = this.state;

    return (
      <div>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label
              data-testid={ `checkbox-music-${trackId}` }
              htmlFor={ trackId }
            >
              Favorita
              <input
                type="checkbox"
                name="isFavorite"
                id={ trackId }
                checked={ isFavorite }
                onChange={ (event) => this.handlerInput(event, musicInfo) }
              />
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = ({
  musicInfo: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }),
}).isRequired;

export default MusicCard;
