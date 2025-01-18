import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import backgroundAfternoon from "../assets/Afternoon.jpg";
import image5 from "../assets/FutureLogin.jpg";
import backgroundMorning from "../assets/Morning.jpg";
import backgroundNight from "../assets/Night.jpg";
import image6 from "../assets/Personal.jpg";
import image4 from "../assets/PhoneAboutUs.jpg";
import image3 from "../assets/PhoneLander.jpg";
import image1 from "../assets/PhoneLogin.jpg";
import image2 from "../assets/PhoneLogin2.jpg";
import "./DareCarousel.css";

const DareCarousel = () => {
  const [timeOfDay, setTimeOfDay] = useState("");
  const [isInteracted, setIsInteracted] = useState(false); // Track interaction state
  const sliderRef = useRef(null);

  const categories = [
    { title: "Cozy Corner", imageUrl: image1 },
    { title: "Creative Spark", imageUrl: image2 },
    { title: "Fresh Air", imageUrl: image3 },
    { title: "Social Butterfly", imageUrl: image4 },
    { title: "Sweat It Out", imageUrl: image5 },
    { title: "Wildcard", imageUrl: image6 },
  ];

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 6 && hours < 12) {
      setTimeOfDay("Morning");
    } else if (hours >= 12 && hours < 18) {
      setTimeOfDay("Afternoon");
    } else {
      setTimeOfDay("Night");
    }

    // Add touchstart event listener to pause and resume autoplay
    const sliderContainer = document.querySelector(".cc-slider-container");
    if (sliderContainer) {
      sliderContainer.addEventListener("touchstart", handleTouchStart);
    }

    // Cleanup event listener on unmount
    return () => {
      if (sliderContainer) {
        sliderContainer.removeEventListener("touchstart", handleTouchStart);
      }
    };
  }, []);

  // This function will pause autoplay and set a delay before resuming autoplay
  const handleTouchStart = () => {
    setIsInteracted(true);
    if (sliderRef.current) {
      sliderRef.current.slickPause();

      // Delay before autoplay resumes after interaction
      setTimeout(() => {
        setIsInteracted(false);
        if (sliderRef.current) {
          sliderRef.current.slickPlay();
        }
      }, 5000);
    }
  };

  // Dynamically set the background image based on the time of day
  const getBackgroundImage = () => {
    switch (timeOfDay) {
      case "Morning":
        return backgroundMorning;
      case "Afternoon":
        return backgroundAfternoon;
      case "Night":
        return backgroundNight;
      default:
        return backgroundMorning;
    }
  };

  const sliderSettings = {
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: !isInteracted,
    autoplaySpeed: 3000,
    draggable: true,
    swipeToSlide: true,
    touchMove: true,
    touchThreshold: 1,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: false,
  };

  return (
    <div
      className="main-page cc-slider-container"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "white",
      }}
      aria-live="polite"
    >
      <h1>{timeOfDay} Dares</h1>

      <Slider {...sliderSettings} ref={sliderRef}>
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
