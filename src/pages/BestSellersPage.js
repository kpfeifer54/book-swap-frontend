import React, { useState } from 'react';
import BestSellersSelector from '../components/BestSellersSelector/BestSellersSelector.js';
import BookList from '../components/BookList/BookList.js';

function BestSellersPage() {

  const [BookListType, setBookListType] = useState("hardcover-fiction")

  function handleSelect(e) {
    setBookListType(e)
  }

  return (
    <div>
      <br></br>
      <h1>New York Times Best Sellers</h1>
      <p>Select a Best Sellers List</p>
      <BestSellersSelector handleSelect={handleSelect} list_type={BookListType}/>
      <br></br>
      <BookList list_type={BookListType}/>
    </div>
  );
}

export default BestSellersPage;