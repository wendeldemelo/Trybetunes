import React, { Component } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './Favorites.css';

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
        <Container className="favorites-list">
          <h3>Músicas Favoritas:</h3>
        </Container>
        <Container>
          <Card style={ { width: '26rem' } }>
            {loading ? <Loading /> : favoriteSongs.map((song) => (
              <ListGroup variant="flush" key={ song.trackId }>

                <ListGroup.Item>
                  <MusicCard
                    key={ song.trackId }
                    onChange={ this.removeFavoriteSongs }
                    checked
                    song={ song }
                  />
                </ListGroup.Item>

              </ListGroup>
            ))}
          </Card>
        </Container>
      </div>
    );
  }
}

export default Favorites;
