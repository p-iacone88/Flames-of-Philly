import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="nav-logo-container">
                <img src="/src/assets/flames-of-philly-chili-pepper-logo-transparent-tiny.png" alt="Flames of Philly Logo" className="nav-logo" />
            </div>
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
