import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

function Navigation() {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/" className="nav-item">Home</Link></li>
                <li><Link to="/asian" className="nav-item">Asian Cuisine</Link></li>
                <li><Link to="/halal" className="nav-item">Halal Options</Link></li>
                <li><Link to="/latin" className="nav-item">Latin Delights</Link></li>
                <li><Link to="/about" className="nav-item">About Us</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;
