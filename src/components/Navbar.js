import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const Navbar = () => {
  const { isLoggedIn } = useUserContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {/* Home link visible to all users */}
            <li className="nav-item">
              <Link className="nav-link" to="/">home</Link>
            </li>
            {/* Other navigation items */}
            <li className="nav-item">
              <Link className="nav-link" to="/notes">notes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/resources">resources</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/talk-to-the-universe">talk to the universe</Link>
            </li>
            {/* Conditional rendering based on login status */}
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">register</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/logout">logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;