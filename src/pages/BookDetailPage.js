import React, { useState, useEffect } from 'react';
import BookAPI from '../api/BookAPI';
import BookItem from '../components/BookItem/BookItem.js';

function BookDetailPage(props) {

  let [book, setBook] = useState(null)

  useEffect(async () => {
    let bookId = props.match.params.bookID
    let book_detail = await getBook(bookId)
    setBook(book_detail)
  }, [props.match.params.bookID])

  async function getBook(book_id) {
    console.log(book_id)
    return await BookAPI.fetchBookByID(book_id)
  }

  return (
    <div>
      <h1> Book Details </h1>
      { book && <BookItem title={book.title} author={book.author} description={book.description} image={book.book_image}/> }
    </div>
  )
}

export default BookDetailPage;