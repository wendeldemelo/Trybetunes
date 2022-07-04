import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToggleButton } from 'react-bootstrap';

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
      <section>
        <p>{ song.trackName }</p>
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
          O seu audio não suporta o elemento
        </audio>
        <ToggleButton
          htmlFor={ song.trackId }
          data-testid={ `checkbox-music-${song.trackId}` }
          className="mb-2"
          id={ song.trackId }
          type="checkbox"
          variant="outline-success"
          checked={ checked }
          value={ song }
          onChange={ this.handleChange }
        >
          Favoritar
        </ToggleButton>
      </section>
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
