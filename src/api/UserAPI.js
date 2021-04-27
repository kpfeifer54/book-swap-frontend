let BASE_URL = "https://book-swap-backend.herokuapp.com"
// let BASE_URL = "http://localhost:8000"

const login = (userObject) => {
  return fetch(`${BASE_URL}/token-auth/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObject)
  }).then(res => res)
};

const getLoggedInUser = (token) => {
  return fetch(`${BASE_URL}/core/current_user/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    }
  }).then(res => res)
};

const signupUser = (userObject) => {
  return fetch(`${BASE_URL}/core/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObject)
  }).then(res => res)
};

const fetchUserByID = (user_id) => {
  return fetch(`${BASE_URL}/core/user-list/${user_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem("auth-user")}`
    }
  }).then(res => res)
};

export { login, getLoggedInUser, signupUser, fetchUserByID }