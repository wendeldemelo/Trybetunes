import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumsList from '../components/AlbumsList';
import './Search.css';

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
        <Container
          data-testid="page-search"
          className="container-search"
        >
          <Row className="justify-content-md-center">
            <Col xs lg="3" md={ 8 }>
              <Form onSubmit={ this.handleSubmit }>
                <Form.Group className="mb-3 label-input-search" controlId="input-search">
                  <Form.Label>Nome da banda ou artista</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pearl Jam"
                    data-testid="search-artist-input"
                    onChange={ this.handleChange }
                    value={ inputSearchValue }
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  ddata-testid="search-artist-button"
                  disabled={ inputSearchValue.length < MIN_CARACTHERS }
                >
                  Pesquisar
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <div>
          { loading && <Loading /> }
          { response && <AlbumsList albums={ albums } artist={ artistName } /> }
        </div>
      </div>
    );
  }
}

export default Search;
