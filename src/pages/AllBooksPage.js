import React, { useState } from 'react';
import BestSellersSelector from '../components/BestSellersSelector/BestSellersSelector.js';
import BookList from '../components/BookList/BookList.js';

function AllBooksPage() {

  const [BookListType, setBookListType] = useState("books")

  function handleSelect(e) {
    setBookListType(e)
  }

  return (
    <div>
      <BestSellersSelector handleSelect={handleSelect}/>
      <BookList list_type={BookListType}/>
    </div>
  );
}

export default AllBooksPage;