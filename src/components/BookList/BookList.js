import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import BookAPI from '../../api/BookAPI';
import UserContext from '../../contexts/UserContext';
import NYTimesAPI from '../../api/NYTimesAPI';
import BookListItem from './BookListItem.js';

function BookList(props) {
  // props: list_type

  const userContext = React.useContext(UserContext);

  const [Books, setBooks] = useState([])

  async function getBook(book_id) {
    return await BookAPI.fetchBookByID(book_id)
  }

  async function getBooks(list_type) {
    if (list_type === "User Books") {
      let book_list = []
      let book_lists = await BookAPI.fetchAllBookLists("book_list")
        for (let list of book_lists) {
          if (list.user !== userContext.user.id) {
            for (let book of list.books) {
              let book_details = await getBook(book)
              book_details["user"] = list.user
              book_list.push(book_details)
            }
          }
        }
      setBooks(book_list)
    } else {
      let book_list = await NYTimesAPI.fetchBestSellers(list_type)
      setBooks(book_list.results.books)
    }
  }
  
  useEffect(() => {
    getBooks(props.list_type)
  }, [userContext.user, props.list_type])

  function renderBookList() {
    let tableData = Books.map((item, index) => {
     return (
       <BookListItem key={index} item={item} list_type={props.list_type}></BookListItem>
     )
    }) 
    return tableData
  }

  return (
    <div>
      <ListGroup>
        { renderBookList() }
      </ListGroup>
    </div>
  );
}

export default BookList;