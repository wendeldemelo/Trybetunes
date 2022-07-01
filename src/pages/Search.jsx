import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumsList from '../components/AlbumsList';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputSearchValue: '',
      loading: false,
      artistName: '',
      albums: [],
      response: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ inputSearchValue: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { inputSearchValue } = this.state;
    this.setState({
      inputSearchValue: '',
      loading: true,
    }, () => {
      searchAlbumsAPI(inputSearchValue)
        .then((request) => this.setState({
          loading: false,
          albums: request,
          artistName: inputSearchValue,
          response: true,
        }));
    });
  }

  render() {
    const { inputSearchValue, loading, response, artistName, albums } = this.state;
    const MIN_CARACTHERS = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ this.handleSubmit }>
          <div className="mb-3">
            <label htmlFor="input-search">
              <input
                data-testid="search-artist-input"
                id="input-search"
                type="text"
                onChange={ this.handleChange }
                value={ inputSearchValue }
                placeholder="Nome da Banda ou Artista"
                className="form-control"
              />
            </label>
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              data-testid="search-artist-button"
              disabled={ inputSearchValue.length < MIN_CARACTHERS }
            >
              Pesquisar
            </button>
          </div>
        </form>
        <div>
          { loading && <Loading /> }
          { response && <AlbumsList albums={ albums } artist={ artistName } /> }
        </div>
      </div>
    );
  }
}

export default Search;
