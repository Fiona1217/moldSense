import React, { useState, useEffect } from 'react';
import pic1 from '@/assets/pic1.png';
import pic2 from '@/assets/pic2.jpeg';
import pic3 from '@/assets/pic3.png';
import pic4 from '@/assets/pic4.png';
import pic5 from '@/assets/pic5.png';
import pic6 from '@/assets/pic6.jpg';
import pic7 from '@/assets/pic7.jpg';
import pic8 from '@/assets/pic8.png';

const ImageCarousel = () => {
  const images = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Move every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isPaused, images.length]);

  return (
    <div 
      className="relative w-full max-w-md mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main carousel container */}
      <div className="relative overflow-hidden rounded-lg shadow-card h-96">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <img
                src={image}
                alt={`Mold detection sample ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
        
        {/* Pause indicator */}
        {isPaused && (
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs text-foreground">Paused</span>
          </div>
        )}
      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-highlight-green' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;