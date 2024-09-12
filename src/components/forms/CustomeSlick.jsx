import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { Outlet } from "react-router-dom";

function CustomeSlick() {
  // const [activeKeyslick, setActiveKeyslick] = useState([true]);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  const slides = [
    {
      title: "Slide 1",
      imgSrc: "https://via.placeholder.com/800x300?text=Slide+1",
    },
    {
      title: "Slide 2",
      imgSrc: "https://via.placeholder.com/800x300?text=Slide+2",
    },
    {
      title: "Slide 3",
      imgSrc: "https://via.placeholder.com/800x300?text=Slide+3",
    },
    {
      title: "Slide 4",
      imgSrc: "https://via.placeholder.com/800x300?text=Slide+4",
    },
  ];

  // const handleThumbnailClick = (index, e) => {
  //   let tempVar = new Array(activeKeyslick.length).fill(false);
  //   tempVar[index] = true;
  //   setActiveKeyslick(tempVar);

  //   sliderRef.current.slickGoTo(index);
  // };

  return (
    <>
          <div>
            <Slider ref={sliderRef} {...settings}>
              {slides.map((slide, index) => (
                <div key={index}>
                  <img src={slide.imgSrc} alt={slide.title} />
                </div>
              ))}
            </Slider>
          </div>

    </>
  );
}

export default CustomeSlick;