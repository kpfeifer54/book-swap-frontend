let API_KEY = "ZpqywG4UMNECknz4N24OjfcWH8ysMGsQ"

let BASE_URL = "https://api.nytimes.com/svc/books/v3/lists"

async function fetchBestSellers(list_name) {
  let response = await fetch(`${BASE_URL}/current/${list_name}.json?api-key=${API_KEY}`)
  let data = response.json()
  return data
}

async function fetchLists() {
  let response = await fetch(`${BASE_URL}/names.json?api-key=${API_KEY}`)
  let data = response.json()
  return data
}

let NYTimesAPI = {
  fetchBestSellers,
  fetchLists
}

export default NYTimesAPI