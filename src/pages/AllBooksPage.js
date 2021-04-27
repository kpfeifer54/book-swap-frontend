import React, { useState } from 'react';
import BestSellersSelector from '../components/BestSellersSelector/BestSellersSelector.js';
import BookList from '../components/BookList/BookList.js';

function AllBooksPage() {

  const [BookListType, setBookListType] = useState("User Books")

  function handleSelect(e) {
    setBookListType(e)
  }

  return (
    <div>
      <br></br>
      <h1>User Books</h1>
      <p>If you see a book you like, suggest a swap!</p>
      <BookList list_type={BookListType}/>
    </div>
  );
}

export default AllBooksPage;