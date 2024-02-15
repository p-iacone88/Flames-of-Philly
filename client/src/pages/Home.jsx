import React, { useState, useEffect } from 'react';
import './Home.css';
import Footer from './Footer';


const images = [
  '/src/assets/asads.jpg',
  '/src/assets/vistaperu.jpg',
  '/src/assets/handynasty.jpg'
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide(); // Use the nextSlide function to advance
    }, 5000); // Change slide every 5 seconds

    return () => clearTimeout(timer);
  }, [currentSlide]); // This dependency ensures the effect respects manual navigation

  return (
    <div className="home-container">
      <h2>Welcome to Flames of Philly!🔥</h2>
      <div className="slideshow-container">
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Slide ${index}`}
            style={{ display: index === currentSlide ? 'block' : 'none' }}
            className="slide"
          />
        ))}
        <button className="prev" onClick={prevSlide}>&#10094;</button>
        <button className="next" onClick={nextSlide}>&#10095;</button>
      </div>

      
    
 <div className="how-this-works-section">
 <h2>How This Works</h2>
 <div className="content">
 <p className="how-this-works-paragraph">
    Welcome to Flames of Philly. Here, you will find all of the spiciest spots Philly has to offer.
    By clicking the buttons above or all restaurants, you will be able to view what has been rated as some
    of the hottest joints in the city. From Asian cuisine, to Latin delights, Halal options and so much more
    that Philly has to offer. Make sure to use our spice rating system to help spread the word for some of Philly's finest! </p>
   <img src="/src/assets/gojjo.jpg" alt="Descriptive Alt Text" className="how-this-works-image" />
 </div>
</div>
</div>
);
};


export default Home;
