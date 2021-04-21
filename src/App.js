import './App.css';
import AppNav from './components/AppNav/AppNav.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import MyBooksPage from './pages/MyBooksPage.js';
import AddBookPage from './pages/AddBookPage.js';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import WishListPage from './pages/WishListPage.js';
import { getLoggedInUser, login } from './api/UserAPI';
import { React, useState, useEffect} from 'react';
import UserContext from './contexts/UserContext.js';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(user)
    const getUser = async () => {
      if (localStorage.getItem("auth-user") !== 'null') {
        let response = await getLoggedInUser(localStorage.getItem("auth-user"));
        let data = await response.json();
        console.log('data', data)
        if (data.username) {
          setIsLoggedIn(true);
          setUser(data);
        }
      }
    }
    if (!user) {
      getUser();
    }
  }, [user])


  const handleLogin = async (evt) => {
    evt.preventDefault();
    let userObject = {
      username: evt.target.username.value,
      password: evt.target.password.value,
    }
    let response = await login(userObject);
    let data = await response.json();
    if (data.token) {
      localStorage.setItem("auth-user", `${data.token}`);
      setIsLoggedIn(true);
      setUser(data.user);
    }
  }

  const handleLogout = () => {
    localStorage.setItem("auth-user", null);
    setIsLoggedIn(false);
    setUser(null);
  }

  const renderLoginPage = () => {
    return (
      <LoginPage
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        user={user}
      />
    )
  }

  const renderHomePage = () => {
    console.log(user)
    return (
      <HomePage
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogout={handleLogout}
      />
    )
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ user: user }}>
        <AppNav/>
        <Router>
          <div>
            <Route exact path="/" component={renderHomePage} />
            <Route exact path="/my-books" component={MyBooksPage} />
            <Route exact path="/add-book" component={AddBookPage} />
            <Route exact path="/login" render={renderLoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/wish-list" component={WishListPage} />
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
