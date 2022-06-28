import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      favoriteSongs: [],
    };

    this.favoriteSongs = this.favoriteSongs.bind(this);
    this.removeFavoriteSongs = this.removeFavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.favoriteSongs();
  }

  favoriteSongs() {
    getFavoriteSongs()
      .then((songs) => this.setState({
        loading: false,
        favoriteSongs: songs,
      }));
  }

  removeFavoriteSongs(event, song) {
    this.setState({ loading: true });
    removeSong(song)
      .then(() => this.favoriteSongs());
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        Músicas Favoritas:
        {loading ? <Loading /> : favoriteSongs.map((song) => (
          <MusicCard
            key={ song.trackId }
            onChange={ this.removeFavoriteSongs }
            checked
            song={ song }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
