import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './AlbumsList.css';

class AlbumsList extends Component {
  render() {
    const { albums, artist } = this.props;
    if (albums.length === 0) {
      return (
        <Container>
          <h3>Nenhum álbum foi encontrado</h3>
        </Container>
      );
    }
    return (
      <div className="albums-list">
        <Container>
          <h3>{`Resultado de álbuns para: ${artist}`}</h3>
        </Container>
        <Container>
          <Row xs={ 1 } md={ 4 } className="g-4">
            { albums.map((album) => {
              const { artworkUrl100, collectionId, artistName, collectionName } = album;
              return (
                <Col key={ collectionId }>
                  <Card style={ { width: '18rem' } }>
                    <Card.Link href={ `/album/${collectionId}` }>
                      <Card.Img variant="top" src={ artworkUrl100 } />
                    </Card.Link>
                    <Card.Body>
                      <Card.Title>{ collectionName }</Card.Title>
                      <Card.Subtitle
                        className="mb-2 text-muted"
                      >
                        { artistName }
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>

    );
  }
}

AlbumsList.propTypes = {
  albums: PropTypes.oneOfType([PropTypes.object]).isRequired,
  artist: PropTypes.string.isRequired,
};

export default AlbumsList;
