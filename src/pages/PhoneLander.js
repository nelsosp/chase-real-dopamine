import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/PhoneLander.jpg";
import MenuBar from "../Components/MenuBar";
import UsernameBar from "../Components/UsernameBar";
import "./PhoneLander.css";

const PhoneLander = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("phone-body");
    document.documentElement.classList.add("phone-html");

    return () => {
      document.body.classList.remove("phone-body");
      document.documentElement.classList.remove("phone-html");
    };
  }, []);

  const handleUserNav = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="phone-lander">
      <section className="phone-lander-section-1">
        <div className="phone-lander-lottie-container">
          <DotLottieReact
            src="https://lottie.host/db1d690c-5e6d-436f-816f-469a637d1448/QQmf8Olaht.lottie"
            autoplay
          />
        </div>
        <div className="phone-lander-title">Dopamine Dares</div>
        <h1 className="phone-lander-heading-1">
          Helping you reconnect with what really matters.
        </h1>
        <MenuBar />
        <UsernameBar />
        <div className="image-container">
          <img src={image} alt="Background" className="phone-lander-image" />
        </div>
        <button className="phone-lander-button" onClick={handleUserNav}>
          Start Your Journey
        </button>
      </section>
      <section className="phone-lander-section-2">
        <div className="phone-lander-title-2">The Digital Drain Is Real</div>
        <h1 className="phone-lander-heading-2">
          Distractions are stealing your most valuable resources.
        </h1>
        <div class="phone-icon-box-container">
          <div class="phone-icon-box">
            <div class="phone-icon">⏳</div>
            <h3 class="phone-icon-box-title">Time</h3>
            <p class="phone-icon-box-text">
              Take intentional breaks from your phone to reset your mind.
            </p>
            <button class="phone-icon-box-button">Learn More</button>
          </div>
          <div class="phone-icon-box">
            <div class="phone-icon">🧠</div>
            <h3 class="phone-icon-box-title">Focus</h3>
            <p class="phone-icon-box-text">
              Reclaim your attention for what truly matters most.
            </p>
            <button class="phone-icon-box-button">Discover</button>
          </div>
          <div class="phone-icon-box">
            <div class="phone-icon">😞</div>
            <h3 class="phone-icon-box-title">Happiness</h3>
            <p class="phone-icon-box-text">
              Spend more time outdoors and with real people.
            </p>
            <button class="phone-icon-box-button">Start Now</button>
          </div>
        </div>
      </section>
      <section className="phone-lander-section-3">
        <div className="phone-lander-title-3">
          Meet Your Digital Reset Button
        </div>
        <h1 className="phone-lander-heading-3">
          Our app gently motivates you to unplug and make space for real
          experiences, relationships, and personal joy.
        </h1>
      </section>
      <section className="phone-lander-section-4">
        <div className="phone-lander-title-4">
          Steps to start living more and scrolling less.
        </div>
        <h1 className="phone-lander-heading-4">
          Sign Up, Track & Reflect, Act & Enjoy
        </h1>
      </section>
      <section className="phone-lander-section-5">
        <div className="phone-lander-title-5">Enjoy Life Beyond the Screen</div>
        <h1 className="phone-lander-heading-5">
          Wake up inspired, feeling more connected, and ending your day with
          memories.
        </h1>
      </section>
    </div>
  );
};

export default PhoneLander;
