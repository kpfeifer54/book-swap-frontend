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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

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

  async function handleDeleteButtonClick(book_id) {
    let user_books = await BookAPI.fetchBookList(userContext.user, props.type)
    console.log(user_books)
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
            <Row className="align-items-center">
              <Col>
                <BookItem book={item}/>
              </Col>
              <Col sm={2}>
                <Link to={`books/${item.id}/edit`}><FontAwesomeIcon className="icons" icon={faEdit}/></Link>
                <span id={item.id} onClick={() => handleDeleteButtonClick(item.id)}><FontAwesomeIcon className="icons" icon={faTrash}/></span>
              </Col>
              {props.type === "wish_list" &&
                <Col sm={3}>
                  <SwapAlert book={item}></SwapAlert>
                </Col>}
            </Row>
          </Container>
        </ListGroup.Item>
     )
    }) 
    return tableData
  }

  return (
    <div>
      <br></br>
      {(props.type === "book_list") ?
        <h1> My Books </h1> :
        <h1> Wish List </h1>
      }
      <div>
        <Link to={`${props.type}/add-book`} className="App-button btn btn-primary">Add Book</Link>
      </div>
      <br></br>
      {/* <BookList list_type={props.type}></BookList> */}
      <ListGroup>
        { renderBookList() }
      </ListGroup>
    </div>
  );
}

export default BookListPage;