// let BASE_URL = "https://book-swap-backend.herokuapp.com"
let BASE_URL = "http://localhost:8000"

async function fetchBooks() {
  let response = await fetch(`${BASE_URL}/books/books/`, {
    headers: {
    'Authorization': `JWT ${localStorage.getItem("auth-user")}`
  }})
  let data = response.json()
  return data
}

async function addBook(bookObject) {
  let response = await fetch(`${BASE_URL}/books/books/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem("auth-user")}`
    },
    method: 'POST',
    body: JSON.stringify(bookObject)})
  let data = response.json()
  return data
}

async function addBookToMyList(book_id) {

}

async function fetchBooksByID(book_id) {
  let response = await fetch(`${BASE_URL}/books/books/${book_id}`, {
    headers: {
    'Authorization': `JWT ${localStorage.getItem("auth-user")}`
  }})
  let data = response.json()
  return data
}

async function fetchBookList() {
  let response = await fetch(`${BASE_URL}/books/my-book-list/`, {
    headers: {
    'Authorization': `JWT ${localStorage.getItem("auth-user")}`
  }})
  let data = response.json()
  return data
}

async function fetchWishList(list_id) {
  let response = await fetch(`${BASE_URL}/books/wish-list/${list_id}`, {
    headers: {
    'Authorization': `JWT ${localStorage.getItem("auth-user")}`
  }})
  let data = response.json()
  return data
}

export default {
  fetchBooks,
  addBook,
  fetchBooksByID,
  fetchBookList,
  fetchWishList
}