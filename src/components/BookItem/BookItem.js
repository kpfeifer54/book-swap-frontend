import React from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useHistory } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';

function BookItem(props) {

  const history = useHistory();

  function handleClick() {
    history.push(`/books/${props.book.id}`)
  }

  return (
    <div>
      <Container>
        <Row className="align-items-center">
          <Col sm={3}>
            {(props.book.id)?
              <Link to={`books/${props.book.id}`}><Image className="Book-image" src={props.book.book_image} thumbnail width="96" height="65" /></Link>
              : <Image className="Book-image" src={props.book.book_image} thumbnail width="96" height="65" />
            }
          </Col>
          <Col>
            {(props.book.id)?
              <Link to={`books/${props.book.id}`}><h2 className="Book-info">{props.book.title}</h2></Link>
              :<h2 className="Book-info">{props.book.title}</h2> 
            }
            <h2 className="Book-info">{props.book.author}</h2>
            <ShowMoreText className="Book-info" onClick={handleClick}>{props.book.description}</ShowMoreText>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BookItem;
