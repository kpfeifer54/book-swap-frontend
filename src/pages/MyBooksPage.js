import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import BookItem from '../components/BookItem/BookItem.js';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BookAPI from '../api/BookAPI';
import UserContext from '../contexts/UserContext';
import SwapAlert from '../components/SwapAlert/SwapAlert.js';
import { Link } from 'react-router-dom';

function MyBooksPage(props) {

  const userContext = React.useContext(UserContext);

  const [Books, setBooks] = useState([])
  const [BookDeleted, setBookDeleted] = useState()

  async function getBooks() {
    console.log(userContext.user)
    if (userContext.user) {
        let my_book_list = userContext.user.books
        let book_array = await Promise.all(my_book_list.map(async (book) => {
          return await getBook(book)
        }))
        setBooks(book_array)
    }
  }

  async function getBook(book_id) {
    return await BookAPI.fetchBookByID(book_id)
  }
  
  useEffect(() => {
    getBooks()
    setBookDeleted(false)
  }, [userContext.user, BookDeleted])

  async function handleButtonClick(book_id) {
    let data = await BookAPI.deleteBook(book_id)
    setBookDeleted(true)
    return data
  }

  function renderBookList() {
    let tableData = Books.map((item, index) => {
      console.log({item})
      // if (item.detail === "Not found.") {
      //   return
      // }
     return (
        <ListGroup.Item key={index}>
          <Container>
            <Row>
              <Col sm={7}>
                <BookItem book={item}/>
              </Col>
              <Col>
                <Link to={`books/${item.id}/edit`}><Button className="App-button">Edit</Button></Link>
                <Button className="App-button" id={item.id} onClick={() => handleButtonClick(item.id)}>Delete</Button>
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
        <h1> My Books </h1>
      <div>
        <Link to="/add-book" className="App-button btn btn-primary" type={props.type}>Add Book</Link>
      </div>
      <ListGroup>
        { renderBookList() }
      </ListGroup>
    </div>
  );
}

export default MyBooksPage;