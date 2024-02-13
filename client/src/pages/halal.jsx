import React from 'react';
import './Halal.css'; // Ensure the CSS file is imported
import asadsHotChickenImage from '../assets/asads.jpg'; // Adjust the path as necessary

function HalalCuisine() {
  return (
    <div className="halal-cuisine-page">
      <nav className="navbar">Navbar Content</nav>
      <div className="content">
        <h1 className="title">Halal</h1>
        <h2 className="restaurant-name">Asad's Hot Chicken</h2>
        <img src={asadsHotChickenImage} alt="Asad's Hot Chicken" className="restaurant-image" />
        <p className="photo-credit">Photo by</p>
        <p className="restaurant-description">Placeholder paragraph...</p>
        <p className="restaurant-location"><strong>Where:</strong> <a href="your-location-link">Location</a></p>
        <button className="take-me-there-btn">Take me here!</button>
      </div>
    </div>
  );
}

export default Halal;
