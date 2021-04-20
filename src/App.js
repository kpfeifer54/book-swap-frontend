import './App.css';
import AppNav from './components/AppNav/AppNav.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import MyBooksPage from './pages/MyBooksPage.js';
import AddBookPage from './pages/AddBookPage.js';

function App() {
  return (
    <div className="App">
      <AppNav/>
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/my-books" component={MyBooksPage} />
          <Route exact path="/add-book" component={AddBookPage} />
        </div>
      </Router>
    </div>
  );
}

export default App;
