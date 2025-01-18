import React, { useEffect, useState } from "react";
import Slider from "react-slick"; // Importing react-slick
import "slick-carousel/slick/slick-theme.css"; // Slick Theme CSS
import "slick-carousel/slick/slick.css"; // Slick CSS
import image3 from "../assets/PhoneLander.jpg";
import image1 from "../assets/PhoneLogin.jpg"; // Import image
import image2 from "../assets/PhoneLogin2.jpg";
import "./DareCarousel.css";

const DareCarousel = () => {
  const [timeOfDay, setTimeOfDay] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // For mobile detection

  // Categories available for selection
  const categories = [
    { title: "Cozy Corner", imageUrl: image1 },
    { title: "Fresh Air", imageUrl: image2 },
    { title: "Creative Spark", imageUrl: image3 },
  ];

  // Detect time of day and set the header accordingly
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 6 && hours < 12) {
      setTimeOfDay("Morning");
    } else if (hours >= 12 && hours < 18) {
      setTimeOfDay("Afternoon");
    } else {
      setTimeOfDay("Night");
    }
  }, []);

  // Handle resizing for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 431); // Adjust breakpoint for mobile
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Settings for react-slick carousel (horizontal, swipeable)
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: isMobile ? 1 : 3, // 1 slide for mobile, 3 slides for desktop
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0, // Set autoplay to no delay
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    draggable: true, // Enable dragging
    swipeToSlide: true, // Enable swipe to slide
    touchMove: true, // Enable touch move
    touchThreshold: 5,
  };

  return (
    <div className="main-page" aria-live="polite">
      <h1>{timeOfDay} Dares</h1>

      {/* Carousel */}
      <Slider {...sliderSettings}>
        {categories.map((category, index) => (
          <div key={index} className="carousel-slide">
            <div className="category-box">
              <h2>{category.title}</h2>
              <img src={category.imageUrl} alt={category.title} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DareCarousel;
