import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      favorites: [],
      loading: true,
    };

    this.handleFavorites = this.handleFavorites.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id)
      .then((musics) => this.setState({
        loading: false,
        songs: musics,
      }));
    getFavoriteSongs()
      .then((songs) => this.setState({
        favorites: songs,
      }));
  }

  async handleFavorites({ target }, music) {
    this.setState({ loading: true });
    const update = target.checked ? addSong : removeSong;
    update(music).then(() => this.setState({ loading: false }));
    const songs = await getFavoriteSongs();
    return this.setState({ favorites: songs });
  }

  render() {
    const { loading, songs, favorites } = this.state;
    return (
      <div>
        <Header />
        {loading
          ? <Loading />
          : (
            <section data-testid="page-album">
              <img src={ songs[0].artworkUrl100 } alt={ songs[0].artistName } />
              <h3 data-testid="album-name">{songs[0].collectionName}</h3>
              <h4 data-testid="artist-name">{songs[0].artistName}</h4>
              <ol>
                { songs.slice(1).map((song) => (
                  <li key={ song.trackId }>
                    <MusicCard
                      checked={ favorites
                        .some((track) => track.trackId === song.trackId) }
                      key={ song.trackId }
                      song={ song }
                      onChange={ this.handleFavorites }
                    />
                  </li>
                ))}
              </ol>
            </section>)}
      </div>
    );
  }
}

Album.propTypes = PropTypes.shape({
  match: { params: { id: PropTypes.number } },
}).isRequired;

export default Album;
