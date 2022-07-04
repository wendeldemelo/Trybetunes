import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class NotFound extends Component {
  render() {
    return (
      <Alert variant="danger" dismissible data-testid="page-not-found">
        <Alert.Heading>Ooops! Erro!</Alert.Heading>
        <p>
          Página não encontrada. Mude a rota e tente novamente.
        </p>
      </Alert>
    );
  }
}

export default NotFound;
