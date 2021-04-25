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

function BookListPage(props) {

  const userContext = React.useContext(UserContext);

  const [Books, setBooks] = useState([])

  async function getBooks() {
    if (userContext.user) {
        let my_book_list = await BookAPI.fetchBookList(userContext.user, props.type)
        let book_array = await Promise.all(my_book_list.books.map(async (book) => {
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
  }, [userContext.user])

  async function handleButtonClick(book_id) {
    let user_books = await BookAPI.fetchBookList(userContext.user, props.type)
    let filtered_array = user_books.books.filter((item) => item !== book_id)
    let book_dict = {"books": filtered_array}
    let data = await BookAPI.addBookToList(book_dict, userContext.user[props.type], props.type)
    getBooks()
    return data
  }

  function renderBookList() {
    let tableData = Books.map((item, index) => {
     return (
        <ListGroup.Item key={index}>
          <Container>
            <Row>
              <Col sm={7}>
                <BookItem title={item.title} author={item.author} description={item.description} image={item.book_image}/>
              </Col>
              <Col>
                <Link to={`books/${item.id}/edit`}><Button className="App-button">Edit</Button></Link>
                <Button className="App-button" id={item.id} onClick={() => handleButtonClick(item.id)}>Delete</Button>
              </Col>
              <Col>
              {props.type === "wish_list" &&
                <SwapAlert title={item.title} author={item.author} book_id={item.id}></SwapAlert>}
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
      {(props.type === "book_list") ?
        <h1> My Books </h1> :
        <h1> Wish List </h1>
      }
      <div>
        <Link to="/add-book" className="App-button btn btn-primary" type={props.type}>Add Book</Link>
      </div>
      {/* <BookList list_type={props.type}></BookList> */}
      <ListGroup>
        { renderBookList() }
      </ListGroup>
    </div>
  );
}

export default BookListPage;