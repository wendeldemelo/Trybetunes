import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { song, onChange } = this.props;
    onChange(event, song);
  }

  render() {
    const { song, checked } = this.props;
    return (
      <div>
        <p>{ song.trackName }</p>
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
          O seu audio não suporta o elemento
        </audio>
        <label
          htmlFor={ song.trackId }
          data-testid={ `checkbox-music-${song.trackId}` }
        >
          Favorita
          <input
            checked={ checked }
            type="checkbox"
            value={ song }
            id={ song.trackId }
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = PropTypes.shape({
  songs: {
    trackName: PropTypes.string,
    trackId: PropTypes.number,
    previewUrl: PropTypes.string,
  },
}).isRequired;

export default MusicCard;
