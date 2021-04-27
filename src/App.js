import 'bootswatch/dist/flatly/bootstrap.min.css';
import './App.css';
import AppNav from './components/AppNav/AppNav.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import AddBookPage from './pages/AddBookPage.js';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BookListPage from './pages/BookListPage.js';
import UserBooksPage from './pages/UserBooksPage.js';
import SwapPage from './pages/SwapPage.js';
import BookDetailPage from './pages/BookDetailPage.js';
import BestSellersPage from './pages/BestSellersPage.js';
import { getLoggedInUser, login } from './api/UserAPI';
import { React, useState, useEffect} from 'react';
import UserContext from './contexts/UserContext.js';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem("auth-user") !== 'null') {
        let response = await getLoggedInUser(localStorage.getItem("auth-user"));
        let data = await response.json();
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
    window.location.replace("/")
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
      <UserContext.Provider value={{user: user}}>
        <Router>
          <AppNav handleLogout={handleLogout}/>
          <div>
            <Route exact path="/" component={renderHomePage} />
            <Route exact path="/my-books" render={() => <BookListPage type="book_list"/>} />
            <Route exact path="/:list/add-book" component={AddBookPage} />
            <Route exact path="/login" render={renderLoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/wish-list" render={() => <BookListPage type="wish_list"/>} />
            <Route exact path="/books" component={UserBooksPage} />
            <Route exact path="/swaps" component={SwapPage} />
            <Route exact path="/books/:bookID" component={BookDetailPage} />
            <Route exact path="/books/:bookID/edit" component={AddBookPage} />
            <Route exact path="/best-sellers" component={BestSellersPage} />
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
