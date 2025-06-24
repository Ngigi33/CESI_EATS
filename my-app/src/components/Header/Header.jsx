import React, { useState, useEffect } from 'react';
import './Header.css';

// Import des images depuis le dossier assets
import header_img from '../../assets/header_img.png'
import header_img2 from '../../assets/header_img2.png'
import header_img3 from '../../assets/header_img3.png'

const Header = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [searchLocation, setSearchLocation] = useState('');
  
  // Array des images pour le carrousel
  const images = [
    header_img,
    header_img2,
    header_img3
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Changes every 3 seconds
    
    return () => clearInterval(interval);
  }, [images.length]);

  const handleLocationSearch = (e) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      // Here you can add logic to handle location search
      console.log('Searching for location:', searchLocation);
      // For example: redirect to results page or filter restaurants
    }
  };

  const handleLocationChange = (e) => {
    setSearchLocation(e.target.value);
  };

  return (
    <div className='header' style={{ backgroundImage: `url(${images[currentImage]})` }}>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        
        {/* Location Search Bar */}
        <form className="location-search-form" onSubmit={handleLocationSearch}>
          <div className="search-input-container">
            <svg 
              className="location-icon" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            <input
              type="text"
              placeholder="Enter your address or city for delivery..."
              value={searchLocation}
              onChange={handleLocationChange}
              className="location-input"
            />
            <button type="submit" className="search-button">
              <svg 
                className="search-icon" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      
      {/* Carousel indicators */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentImage ? 'active' : ''}`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;