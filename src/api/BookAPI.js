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

async function fetchBooksByID(book_id) {
  let response = await fetch(`${BASE_URL}/books/books/${book_id}`, {
    headers: {
    'Authorization': `JWT ${localStorage.getItem("auth-user")}`
  }})
  let data = response.json()
  return data
}

async function fetchBookList(user, list_type) {
  let response = await fetch(`${BASE_URL}/books/${list_type}/${user[list_type]}`, {
    headers: {
    'Authorization': `JWT ${localStorage.getItem("auth-user")}`
  }})
  let data = response.json()
  return data
}

async function addBookToList(book_list, list_id, list_type) {
  let response = await fetch(`${BASE_URL}/books/${list_type}/${list_id}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem("auth-user")}`
    },
    method: 'PATCH',
    body: JSON.stringify(book_list)})
  let data = response.json()
  return data
}

export default {
  fetchBooks,
  addBook,
  fetchBooksByID,
  fetchBookList,
  addBookToList
}