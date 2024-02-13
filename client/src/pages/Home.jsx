import React, { useState, useEffect } from 'react';
import './Home.css';

const images = [
  '/src/assets/asads.jpg',
  '/src/assets/vistaperu.jpg',
  '/src/assets/mixto.jpg'
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === images.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="home-container">
      <h2>Welcome to Flames of Philly!</h2>
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
      </div>
    </div>
  );
};

export default Home;
