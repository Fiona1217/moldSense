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
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate images for infinite loop effect
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Marquee container */}
      <div className="relative h-80 overflow-hidden rounded-lg">
        <div 
          className={`flex gap-6 h-full ${
            isPaused ? '' : 'animate-marquee'
          }`}
          style={{
            width: 'fit-content',
            animationDuration: '30s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear'
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 relative"
              style={{
                width: '280px',
                height: '320px'
              }}
            >
              <img
                src={image}
                alt={`Mold detection sample ${(index % images.length) + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent rounded-lg"></div>
            </div>
          ))}
        </div>
        
        {/* Fade edges for smooth infinite effect */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        
        {/* Pause indicator */}
        {isPaused && (
          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs text-foreground">Paused</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;