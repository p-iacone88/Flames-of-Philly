import React from 'react';
import './Latin.css'; 
import mixtoImage from '../assets/mixto.jpg'; 

function Latin() {
  return (
    <div className="latin-cuisine-page">
      <nav className="navbar">Navbar Content</nav>
      <div className="content">
        <h1 className="title">Latin Cuisine</h1>
        <h2 className="restaurant-name">Mixto's</h2>
        <img src={mixtoImage} alt="Mixto's" className="restaurant-image" />
        <p className="photo-credit">Photo by</p>
        <p className="restaurant-description">Placeholder paragraph...</p>
        <p className="restaurant-location"><strong>Where:</strong> <a href="your-location-link">Location</a></p>
        <button className="take-me-there-btn">Take me here!</button>
      </div>
    </div>
  );
}

export default Latin;
