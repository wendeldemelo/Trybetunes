import React, { Component } from 'react';
import { Spinner, Container, Row, Col } from 'react-bootstrap';

class Loading extends Component {
  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </Spinner>
          </Col>
        </Row>

      </Container>
    );
  }
}

export default Loading;
