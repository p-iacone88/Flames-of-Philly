import React from 'react';
import './asian.css'; // Ensures the CSS file is imported
import hanDynastyImage from './assets/handynasty.webp'; //

function AsianCuisine() {
  return (
    <div className="asian-cuisine-page">
      <nav className="navbar">Navbar Content</nav>
      <div className="content">
        <h1 className="title">Asian Cuisine</h1>
        <h2 className="restaurant-name">Han Dynasty</h2>
        <img src={hanDynastyImage} alt="Han Dynasty" className="restaurant-image" />
        <p className="photo-credit">Photo by</p>
        <p className="restaurant-description">Placeholder paragraph...</p>
        <p className="restaurant-location"><strong>Where:</strong> <a href="your-location-link">Location</a></p>
        <button className="take-me-there-btn">Take me here!</button>
      </div>
    </div>
  );
}

export default Asian;
