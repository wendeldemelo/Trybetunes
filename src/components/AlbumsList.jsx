import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AlbumsList extends Component {
  render() {
    const { albums, artist } = this.props;
    if (albums.length === 0) return <p>Nenhum álbum foi encontrado</p>;
    return (
      <div>
        <p>{ `Resultado de álbuns de: ${artist}` }</p>
        { albums.map((album) => {
          const { artworkUrl100, collectionId, artistName, collectionName } = album;
          return (
            <div key={ collectionId }>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                <img src={ artworkUrl100 } alt={ artistName } />
              </Link>
              <p>{ collectionName }</p>
              <p>{ artistName }</p>
            </div>
          );
        })}
      </div>
    );
  }
}

AlbumsList.propTypes = {
  albums: PropTypes.oneOfType([PropTypes.object]).isRequired,
  artist: PropTypes.string.isRequired,
};

export default AlbumsList;
