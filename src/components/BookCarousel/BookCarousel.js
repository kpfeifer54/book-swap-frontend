import React, { useState, useEffect } from 'react';
import NYTimesAPI from '../../api/NYTimesAPI';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Book Carousel displays books from current NYTimes hardcover-fiction best sellers
function BookCarousel() {

  const [Books, setBooks] = useState([])

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getBooks()
    }
    return () => mounted = false;
  }, [])

  async function getBooks() {
    let book_list = await NYTimesAPI.fetchBestSellers("hardcover-fiction")
    setBooks(book_list.results.books)
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return(
    <Carousel responsive={responsive}>
      {Books.map((item, index) => {
        return(
          <div>
            <Image key={index} src={item.book_image} thumbnail width="209" height="160"/>
          </div>
        )
      })}
    </Carousel>
  )
}

export default BookCarousel;