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

async function fetchAllBookLists(list_type) {
  let response = await fetch(`${BASE_URL}/books/${list_type}/`, {
    headers: {
    'Authorization': `JWT ${localStorage.getItem("auth-user")}`
  }})
  let data = response.json()
  return data
}

async function addSwap(swapObject) {
  let response = await fetch(`${BASE_URL}/books/swap/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem("auth-user")}`
    },
    method: 'POST',
    body: JSON.stringify(swapObject)})
  let data = response.json()
  return data
}

async function fetchSwapList() {
  let response = await fetch(`${BASE_URL}/books/swap/`, {
    headers: {
    'Authorization': `JWT ${localStorage.getItem("auth-user")}`
  }})
  let data = response.json()
  return data
}

async function editSwap(swap_id, swap_detail) {
  let response = await fetch(`${BASE_URL}/books/swap/${swap_id}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem("auth-user")}`
    },
    method: 'PATCH',
    body: JSON.stringify(swap_detail)})
  let data = response.json()
  return data
}

async function deleteSwap(swap_id) {
  let response = await fetch(`${BASE_URL}/books/swap/${swap_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem("auth-user")}`
    },
    method: 'DELETE'})
}

export default {
  fetchBooks,
  addBook,
  fetchBooksByID,
  fetchBookList,
  addBookToList,
  fetchAllBookLists,
  addSwap,
  fetchSwapList,
  editSwap,
  deleteSwap
}