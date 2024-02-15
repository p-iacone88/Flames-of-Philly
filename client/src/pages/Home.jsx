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

      <hr className="hr-divider" />
    
 <div className="how-this-works-section">
 <h2>How This Works</h2>
 <div className="content">
   <p>Your paragraph text goes here. Explain how your service or website works, keeping the explanation straightforward and concise for your visitors.</p>
   <img src="/src/assets/gojjo.jpg" alt="Descriptive Alt Text" className="how-this-works-image" />
 </div>
</div>
</div>
);
};


export default Home;
