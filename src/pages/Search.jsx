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
          <label htmlFor="input-search">
            <input
              data-testid="search-artist-input"
              type="text"
              onChange={ this.handleChange }
              value={ inputSearchValue }
              placeholder="Nome da Banda ou Artista"
            />
          </label>
          <label htmlFor="search-button">
            <input
              data-testid="search-artist-button"
              type="submit"
              value="Pesquisar"
              disabled={ inputSearchValue.length < MIN_CARACTHERS }
            />
          </label>
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
