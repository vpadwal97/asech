import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import './Carousels.css'; // Optional: For custom styles

const Carousels = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: current => setActiveIndex(current), // Update active index on slide change
    };

    const images = [
        { src: 'image1.jpg', alt: 'Slide 1' },
        { src: 'image2.jpg', alt: 'Slide 2' },
        { src: 'image3.jpg', alt: 'Slide 3' },
    ];

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img className="slide-image" src={image.src} alt={image.alt} />
                    </div>
                ))}
            </Slider>
            <div className="thumbnail-container">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`thumbnail ${activeIndex === index ? 'active' : ''}`}
                        onMouseEnter={() => setActiveIndex(index)} // Set active on hover
                        onClick={() => setActiveIndex(index)} // Set active on click (optional)
                    >
                        <img src={image.src} alt={`Thumbnail ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousels;

