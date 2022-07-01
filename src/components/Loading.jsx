import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';

class Loading extends Component {
  render() {
    return (
      <section>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </section>
    );
  }
}

export default Loading;
