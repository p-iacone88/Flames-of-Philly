import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <nav className="navbar">
            <div className="nav-logo-container">
                <img
                    src="/src/assets/flames-of-philly-chili-pepper-logo-transparent-tiny.png"
                    alt="Flames of Philly Logo"
                    className="nav-logo"
                />
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/" className="nav-item">Home</Link>
                </li>
                <li>
                    <Link to="/restaurant" className="nav-item">Hot Restaurants</Link>
                </li>
                <li>
                    <Link to="/login" className="nav-item">Login</Link>
                </li>
                <li>
                    <Link to="/signup" className="nav-item">Signup</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
