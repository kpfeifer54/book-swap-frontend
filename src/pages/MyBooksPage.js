import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import BookItem from '../components/BookItem/BookItem.js';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BookAPI from '../api/BookAPI'

function MyBooksPage(props) {

  const [Books, setBooks] = useState([])

  async function getBooks() {
    let data = await BookAPI.fetchBooks()
    console.log(data)
    setBooks(data)
  }
  
  useEffect(() => {
    getBooks()
  }, [])

  function renderBookList() {
    let tableData = Books.map((item, index) => {
     return (
        <ListGroup.Item>
          <Container>
            <Row>
              <Col sm={10}>
                <BookItem title={item.title} author={item.author} description={item.description} image={item.image}/>
              </Col>
              <Col>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>
     )
    }) 
    return tableData
  }

  return (
    <div>
      <div>
        <Button>Add Book</Button>
      </div>
      <ListGroup>
        { renderBookList() }
        <ListGroup.Item>
          <Container>
            <Row>
              <Col sm={10}>
                <BookItem/>
              </Col>
              <Col>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>
        <ListGroup.Item><BookItem/></ListGroup.Item>
        <ListGroup.Item><BookItem/></ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default MyBooksPage;