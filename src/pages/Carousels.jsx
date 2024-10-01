// Carousel.js
import React, { useState } from 'react';
import Slider from 'react-slick';
// import './Carousel.css'; // Create this CSS file for styles

const Carousels = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      img: 'https://via.placeholder.com/600x300?text=Image+1',
      text: 'Description for Image 1',
    },
    {
      img: 'https://via.placeholder.com/600x300?text=Image+2',
      text: 'Description for Image 2',
    },
    {
      img: 'https://via.placeholder.com/600x300?text=Image+3',
      text: 'Description for Image 3',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setActiveIndex(next),
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <img src={slide.img} alt={`Slide ${index + 1}`} />
            <p>{slide.text}</p>
          </div>
        ))}
      </Slider>
      <div className="thumbnails">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`thumbnail ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={slide.img} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousels;
