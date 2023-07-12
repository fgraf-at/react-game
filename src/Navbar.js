// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/addplayer">Spieler hinzufügen</Link>
                </li>
                <li>
                    <Link to="/game">Spiel</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
