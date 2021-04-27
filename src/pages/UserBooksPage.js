import React from 'react';
import BookList from '../components/BookList/BookList.js';

function UserBooksPage() {

  return (
    <div>
      <br></br>
      <h1>User Books</h1>
      <p>If you see a book you like, suggest a swap!</p>
      <BookList list_type={"User Books"}/>
    </div>
  );
}

export default UserBooksPage;