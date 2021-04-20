let BASE_URL = "https://book-swap-backend.herokuapp.com/books/"

async function fetchBooks() {
  let init = {headers: {
    origin: "localhost"
  }}
  let response = await fetch(BASE_URL, init)
  let data = response.json()
  return data
}

async function addBook(bookObject) {
  let response = await fetch(`${BASE_URL}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(bookObject)})
  let data = response.json()
  return data
}

export default {
  fetchBooks,
  addBook
}