import React, { useState, useEffect } from 'react';
// import { fetchArticles, searchArticles } from '../api/ArticlesAPI';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

function HomePage(props) {
  return (
    <div>
      <Jumbotron>
        <h1>Welcome to Book Swap!</h1>
        <p>
          This is a site for swapping books
        </p>
        <p>
          <Button variant="primary">Sign up</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default HomePage;