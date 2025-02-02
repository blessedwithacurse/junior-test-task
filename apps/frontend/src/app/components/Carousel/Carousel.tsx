import React, { useState } from 'react';
import './Carousel.css'; 

interface CarouselProps {
  images: string[] | undefined; 
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if(!images) return null;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="carousel">
      <button onClick={prevImage}>Prev</button>
      <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
      <button onClick={nextImage}>Next</button>
    </div>
  );
};

export default Carousel;
