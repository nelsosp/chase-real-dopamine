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
  const [selectedItem, setSelectedItem] = useState(null);
  const [dare, setDare] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);
  const sliderRef = useRef(null);

  const categories = [
    { title: "Cozy Corner", imageUrl: image1 },
    { title: "Creative Spark", imageUrl: image2 },
    { title: "Fresh Air", imageUrl: image3 },
    { title: "Social Butterfly", imageUrl: image4 },
    { title: "Sweat It Out", imageUrl: image5 },
    { title: "Wildcard", imageUrl: image6 },
  ];

  // Set the time of day based on the current time
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 6 && hours < 12) {
      setTimeOfDay("Morning");
    } else if (hours >= 12 && hours < 18) {
      setTimeOfDay("Afternoon");
    } else {
      setTimeOfDay("Night");
    }

    const sliderContainer = document.querySelector(".cc-slider-container");
    if (sliderContainer) {
      sliderContainer.addEventListener("touchstart", handleTouchStart);
    }

    return () => {
      if (sliderContainer) {
        sliderContainer.removeEventListener("touchstart", handleTouchStart);
      }
    };
  }, []);

  const handleTouchStart = () => {
    setIsInteracted(true);
    if (sliderRef.current) {
      sliderRef.current.slickPause();
      setTimeout(() => {
        setIsInteracted(false);
        if (sliderRef.current) {
          sliderRef.current.slickPlay();
        }
      }, 5000);
    }
  };

  // Format category by removing spaces and capitalizing correctly
  const formatCategory = (category) => {
    if (!category) return category;
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(""); // Join them to create one word without spaces
  };

  // Fetch a random dare based on the selected category and time of day
  const fetchDare = async (category) => {
    const backendUrl = getBackendUrl(); // Get the correct backend URL
    const formattedCategory = formatCategory(category);
    const url = `${backendUrl}/dare/${timeOfDay}/${formattedCategory}`;

    console.log("Request URL:", url); // Log the URL to the console
    console.log("Time of day:", timeOfDay); // Log the time of day

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("Fetched dare:", data); // Log the entire response

      // Directly check if `data` is a string (no need for `data.dare`)
      if (typeof data === "string" && data.trim() !== "") {
        setDare(data); // Set the dare if it's a valid string
      } else {
        console.error("Dare is not valid in the response:", data);
        setDare("No dare available."); // Default message if dare is not found
      }

      setIsOverlayVisible(true); // Show the overlay after fetching the dare
    } catch (err) {
      console.error("Error fetching dare:", err);
      setDare("Error fetching dare."); // Fallback message in case of an error
    }
  };

  // Close the overlay when clicking outside or on the close button
  const closeOverlay = () => {
    setIsOverlayVisible(false);
    setSelectedItem(null); // Reset selected item
  };

  const getBackendUrl = () => {
    if (window.location.hostname === "localhost") {
      return "http://localhost:5001"; // For local development
    } else {
      return "https://chase-real-dopamine-backend-1047292940162.us-central1.run.app"; // Cloud Run URL
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

  // Slider settings for the carousel
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
    >
      <h1>{timeOfDay} Dares</h1>

      <Slider {...sliderSettings} ref={sliderRef}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              selectedItem === index ? "selected" : ""
            }`}
            onClick={() => setSelectedItem(index)}
          >
            <div className="category-box">
              <h2>{category.title}</h2>
              <img src={category.imageUrl} alt={category.title} />
              {selectedItem === index && (
                <button
                  className="get-dare-btn"
                  onClick={() => fetchDare(category.title)}
                >
                  Get Dare
                </button>
              )}
            </div>
          </div>
        ))}
      </Slider>

      {isOverlayVisible && (
        <div
          className={`overlay ${isOverlayVisible ? "show" : ""}`}
          onClick={closeOverlay}
        >
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <h2>{dare ? dare : "Loading dare..."}</h2>
            <button className="complete-btn" onClick={closeOverlay}>
              Complete
            </button>
            <button className="chicken-out-btn" onClick={closeOverlay}>
              Chicken Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DareCarousel;
