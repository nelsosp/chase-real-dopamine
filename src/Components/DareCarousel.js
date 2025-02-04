import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import backgroundAfternoon from "../assets/Afternoon.jpg";
import image1 from "../assets/CozyCorner.jpg";
import image2 from "../assets/CreativeSpark.jpg";
import image3 from "../assets/FreshAir.jpg";
import backgroundMorning from "../assets/Morning.jpg";
import backgroundNight from "../assets/Night.jpg";
import image4 from "../assets/SocialButterfly.jpg";
import image5 from "../assets/SweatItOut.jpg";
import image6 from "../assets/Wildcard.jpg";
import Clock from "./Clock";
import "./DareCarousel.css";
import DareCompletion from "./DareCompletion";
import LottieAnimation from "./LottieDare";
import MenuBar from "./MenuBar";
import UsernameBar from "./UsernameBar";

// Mapping timeOfDay to custom display names
const timeOfDayNames = {
  Morning: "Rise & Shine",
  Afternoon: "Afternoon Boost",
  Night: "After Dark",
};

const DareCarousel = () => {
  const [timeOfDay, setTimeOfDay] = useState("");
  const [displayTimeOfDay, setDisplayTimeOfDay] = useState(""); // To store custom display name
  const [timeOfDayDescription, setTimeOfDayDescription] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [dare, setDare] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);

  const categories = [
    {
      title: "Cozy Corner",
      message: "Comforts of Your Home",
      imageUrl: image1,
    },
    {
      title: "Creative Spark",
      message: "Get Into Imagination",
      imageUrl: image2,
    },
    { title: "Fresh Air", message: "The Crisp Outdoors", imageUrl: image3 },
    {
      title: "Social Butterfly",
      message: "Outgoing Towards Others",
      imageUrl: image4,
    },
    { title: "Sweat It Out", message: "Increase Blood Flow", imageUrl: image5 },
    { title: "Wildcard", message: "Try Your Luck", imageUrl: image6 },
  ];

  // Set the time of day based on the current time
  useEffect(() => {
    const hours = new Date().getHours();
    let internalTimeOfDay = "";
    let description = "";

    if (hours >= 6 && hours < 12) {
      internalTimeOfDay = "Morning";
      description =
        "Quiet determination, casting a warm glow that inspires a fresh start.";
    } else if (hours >= 12 && hours < 19) {
      internalTimeOfDay = "Afternoon";
      description =
        "Vibrant energy, where the day's momentum propels you forward.";
    } else {
      internalTimeOfDay = "Night";
      description =
        "A peaceful stillness settles in, offering a moment of reflection.";
    }

    setTimeOfDay(internalTimeOfDay); // Store the internal value
    setTimeOfDayDescription(description);

    // Set the custom display name based on timeOfDay
    setDisplayTimeOfDay(timeOfDayNames[internalTimeOfDay]);

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

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 431); // Adjust to your mobile breakpoint
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
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
    const backendUrl = getBackendUrl();
    const formattedCategory = formatCategory(category);
    const url = `${backendUrl}/dare/${timeOfDay}/${formattedCategory}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      if (typeof data === "string" && data.trim() !== "") {
        setDare(data);
      } else {
        console.error("Dare is not valid in the response:", data);
        setDare("No dare available.");
      }

      setIsOverlayVisible(true); // Show the overlay after fetching the dare
    } catch (err) {
      console.error("Error fetching dare:", err);
      setDare("Error fetching dare.");
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

  const sliderSettings = {
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: !isInteracted,
    autoplaySpeed: 5000,
    draggable: true,
    swipeToSlide: true,
    touchMove: true,
    touchThreshold: 3,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    slidesToShow: isMobile ? 1 : 2,
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: false,
  };

  const username = localStorage.getItem("username");

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
      <MenuBar />
      <UsernameBar />
      <Clock />
      <h1>{displayTimeOfDay}</h1> {/* Use custom display name */}
      <p>{timeOfDayDescription}</p>
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
              <p>{category.message}</p>
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
          className={`overlay2 ${isOverlayVisible ? "show" : ""}`}
          onClick={closeOverlay}
        >
          {" "}
          <LottieAnimation />
          <div
            className="overlay2-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{dare ? dare : "Loading dare..."}</h2>
            <div onClick={closeOverlay}>
              {isOverlayVisible && dare && (
                <DareCompletion username={username} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DareCarousel;
