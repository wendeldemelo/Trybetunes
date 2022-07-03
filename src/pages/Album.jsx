import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Card, ListGroup, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import './Album.css';

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
            <div
              data-testid="page-album"
              className="album-container"
            >
              <Container>
                <Row>
                  <Col xs={ 8 } md={ 4 }>
                    <Card style={ { width: '18rem' } }>
                      <Card.Img
                        variant="top"
                        src={ songs[0].artworkUrl100 }
                        alt={ songs[0].artistName }
                      />
                      <Card.Body>
                        <Card.Title
                          data-testid="album-name"
                        >
                          {songs[0].collectionName}
                        </Card.Title>
                        <Card.Subtitle
                          className="mb-2 text-muted"
                          data-testid="artist-name"
                        >
                          {songs[0].artistName}
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={ 6 } md={ 4 }>
                    <Card style={ { width: '26rem' } }>
                      <ol>
                        <ListGroup variant="flush">
                          { songs.slice(1).map((song) => (
                            <ListGroup.Item key={ song.trackId }>
                              <li>
                                <MusicCard
                                  checked={ favorites
                                    .some((track) => track.trackId === song.trackId) }
                                  key={ song.trackId }
                                  song={ song }
                                  onChange={ this.handleFavorites }
                                />
                              </li>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </ol>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>)}
      </div>
    );
  }
}

Album.propTypes = PropTypes.shape({
  match: { params: { id: PropTypes.number } },
}).isRequired;

export default Album;
