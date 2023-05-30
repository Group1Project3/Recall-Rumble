import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logo.png'; // Path to your logo image
import '../styles/navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={logoImage} alt="Recall Rumble Logo" />
      </Link>
      <div className="navbar-menu">
        <ul>
          <li>
            <Link to="/game">Game</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
