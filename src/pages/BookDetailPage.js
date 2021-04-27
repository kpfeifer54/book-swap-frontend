import React, { useState, useEffect } from 'react';
import BookAPI from '../api/BookAPI';
import GoogleBooksAPI from '../api/GoogleBooksAPI';
import Image from 'react-bootstrap/Image'

function BookDetailPage(props) {

  const [Book, setBook] = useState()
  const [BookReview, setBookReview] = useState()

  useEffect( () => {
    async function fetchData() {
      let bookId = props.match.params.bookID
      let book_detail = await getBook(bookId)
      setBook(book_detail)
    }
    fetchData();
  }, [props.match.params.bookID])

  useEffect( () => {
    renderBook(Book)
  }, [Book])

  async function getBook(book_id) {
    return await BookAPI.fetchBookByID(book_id)
  }

  async function getGoogleBook(title, author) {
    let title_format = title.replace(/\s/g, '+')
    let author_format = author.replace(/\s/g, '+')
    let data = await GoogleBooksAPI.fetchBook(title_format, author_format)
    return data
  }

  async function renderBook(book) {
    if (book) {
      let data = await getGoogleBook(book.title, book.author)
      setBookReview({"description": data.items[0].volumeInfo.description, "avg_review": data.items[0].volumeInfo.averageRating, "preview_link": data.items[0].volumeInfo.previewLink})
    }
  }

  return (
    <div>
      { Book && 
        <div>
          <h1>{Book.title}</h1>
          <h2>By {Book.author}</h2>
          <Image src={Book.book_image} thumbnail width="96" height="65" />
        </div>
      }
      { BookReview && 
        <div>
          <a href={BookReview.preview_link}><h3>{BookReview.avg_review} Stars</h3></a>
          <p>{BookReview.description}</p>
        </div>
      }
    </div>
  )
}

export default BookDetailPage;