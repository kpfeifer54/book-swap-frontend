import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import BookItem from '../components/BookItem/BookItem.js';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BookAPI from '../api/BookAPI';
import UserContext from '../contexts/UserContext';
import { Link } from 'react-router-dom';

function MyBooksPage(props) {

  const userContext = React.useContext(UserContext);
  console.log(userContext.user)

  const [Books, setBooks] = useState([])

  async function getBooks() {
    let my_book_list = await BookAPI.fetchBookList()
    let book_array = await Promise.all(my_book_list[0].books.map(async (book) => {
      return await getBook(book)
    }))
    console.log(book_array)
    setBooks(book_array)
  }

  async function getBook(book_id) {
    return await BookAPI.fetchBooksByID(book_id)
  }
  
  useEffect(() => {
    getBooks()
  }, [])

  function renderBookList() {
    let tableData = Books.map((item, index) => {
     return (
        <ListGroup.Item key={index}>
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
        <Link to="/add-book" className="btn btn-primary" type="my_books">Add Book</Link>
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