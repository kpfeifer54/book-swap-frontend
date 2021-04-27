let API_KEY = "AIzaSyBNDABcUu3doT0noTLN6R3-vFqn-tnLUcU"

let BASE_URL = "https://www.googleapis.com/books/v1/volumes?"

async function fetchBook(title, author) {
  let response = await fetch(`${BASE_URL}q="intitle:${title}+inauthor:${author}&key=${API_KEY}`)
  let data = response.json()
  return data
}

export default {
  fetchBook
}