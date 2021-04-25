import React from 'react';
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function BookItem(props) {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={props.image} thumbnail width="96" height="65" />
          </Col>
          <Col sm={7}>
            <h2 className="Book-info">{props.title}</h2>
            <h2 className="Book-info">{props.author}</h2>
            <p className="Book-info">{props.description}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BookItem;
