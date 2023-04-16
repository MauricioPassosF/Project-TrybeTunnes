import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isFavorite: false,
    loading: false,
  };

  componentDidUpdate(previuousProps) {
    const { favorite } = this.props;
    console.log('favorte', favorite);
    console.log('previousProps', previuousProps.favorite);
    if (favorite !== previuousProps.favorite) {
      this.setState({
        isFavorite: favorite,
      });
    }
  }

  // componentDidMount() {
  //   const { favorite } = this.props;
  //   this.setState({
  //     isFavorite: favorite,
  //     teste: true,
  //   });
  // }

  handlerHelper = async (musicInfo, checked) => {
    if (checked) {
      await addSong(musicInfo);
    } else {
      await removeSong(musicInfo);
    }
    this.setState({
      loading: false });
  };

  handlerInput = ({ target }, musicInfo) => {
    const { name, checked } = target;
    this.setState({
      [name]: checked,
      loading: true,
    }, () => this.handlerHelper(musicInfo, checked));
  };

  render() {
    const { musicInfo, favorite } = this.props;
    const { trackName, previewUrl, trackId } = musicInfo;
    const { isFavorite, loading } = this.state;
    console.log('render isFavorite', isFavorite);
    console.log('render favorite', favorite);
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
  favorite: PropTypes.bool,
}).isRequired;

export default MusicCard;
