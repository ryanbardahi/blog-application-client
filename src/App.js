import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  const isLoggedIn = false;

  return (
    <Router>
      <div className="app">
        <header>
          <h1 className="page-title">the meditation notes</h1>
        </header>
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/notes">notes</Link></li>
            <li><Link to="/resources">resources</Link></li>
            <li><Link to="/talk-to-the-universe">talk to the universe</Link></li>
            {!isLoggedIn && (
              <>
                <li><Link to="/login">login</Link></li>
                <li><Link to="/register">register</Link></li>
              </>
            )}
            {isLoggedIn && <li><Link to="/logout">logout</Link></li>}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;