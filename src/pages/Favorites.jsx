import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    loading: false,
    favoritesSongs: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    this.getFavorites();
    this.setState({ loading: false });
  }

  updateFavorites = async () => {
    const { favoritesSongs } = this.state;
    console.log('lista antes de autliazar', favoritesSongs);
    this.setState(
      { loading: true },
      () => this.getFavorites(),
    );
    console.log('lista depois de autliazar', favoritesSongs);
    this.setState({ loading: false });
  };

  getFavorites = async () => {
    const list = await getFavoriteSongs();
    this.setState({
      favoritesSongs: list,
    });
  };

  render() {
    const { loading, favoritesSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        Teste Favorites
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <main>
            {favoritesSongs
              // .filter((e, index) => (index === 0))
              .map((musicInfo, index) => (
                <MusicCard
                  updateFavorite={ this.updateFavorites }
                  fatherPage="favorites"
                  key={ index }
                  musicInfo={ musicInfo }
                  favorite={ favoritesSongs
                    .some(({ trackId }) => (
                      trackId === musicInfo.trackId)) }
                />
              ))}
          </main>
        )}
      </div>
    );
  }
}

export default Favorites;
