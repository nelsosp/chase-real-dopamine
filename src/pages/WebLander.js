import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import video2 from "../assets/WebLander2.mp4";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import video from "../assets/WebLanderNew.mp4";
import MenuBar from "../Components/MenuBar";
import UsernameBar from "../Components/UsernameBar";
import "./WebLander.css";

const WebLander = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("web-body");
    document.documentElement.classList.add("web-html");

    return () => {
      document.body.classList.remove("web-body");
      document.documentElement.classList.remove("web-html");
    };
  }, []);

  const handleUserNav = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="web-lander">
      <section className="section-1">
        <MenuBar />
        <UsernameBar />
        <video
          className="background-video-lander"
          src={video}
          muted
          loop
          autoPlay
        ></video>{" "}
        <div className="web-lander-lottie-container">
          <DotLottieReact
            src="https://lottie.host/db1d690c-5e6d-436f-816f-469a637d1448/QQmf8Olaht.lottie"
            autoplay
          />
        </div>
        <div className="web-lander-title">Dopamine Dares</div>
        <h1 className="web-lander-heading-1">
          Helping you reconnect with what really matters.
        </h1>
        <button className="web-lander-button" onClick={handleUserNav}>
          Start Your Journey
        </button>
      </section>
      <section className="section-2">
        <div className="web-lander-title-2">The Digital Drain Is Real</div>
        <h1 className="web-lander-heading-2">
          Distractions are stealing your most valuable resources.
        </h1>
        <div class="icon-box-container">
          <div class="icon-box">
            <div class="icon">⏳</div>
            <h3 class="icon-box-title">Time</h3>
            <p class="icon-box-text">
              Take intentional breaks from your phone to reset your mind.
            </p>
            <button class="icon-box-button">Learn More</button>
          </div>
          <div class="icon-box">
            <div class="icon">🧠</div>
            <h3 class="icon-box-title">Focus</h3>
            <p class="icon-box-text">
              Reclaim your attention for what truly matters most.
            </p>
            <button class="icon-box-button">Discover</button>
          </div>
          <div class="icon-box">
            <div class="icon">😞</div>
            <h3 class="icon-box-title">Happiness</h3>
            <p class="icon-box-text">
              Spend more time outdoors and with real people.
            </p>
            <button class="icon-box-button">Start Now</button>
          </div>
        </div>
      </section>
      <section className="section-3">
        <div className="web-lander-title-3">Meet Your Digital Reset Button</div>
        <h1 className="web-lander-heading-3">
          Our app gently motivates you to unplug and make space for real
          experiences, relationships, and personal joy.
        </h1>
      </section>
      <section className="section-4">
        <div className="web-lander-title-4">
          Steps to start living more and scrolling less.
        </div>
        <h1 className="web-lander-heading-4">
          Sign Up, Track & Reflect, Act & Enjoy
        </h1>
      </section>
      <section className="section-5">
        <div className="web-lander-title-5">Enjoy Life Beyond the Screen</div>
        <h1 className="web-lander-heading-5">
          Wake up inspired, feeling more connected, and ending your day with
          memories.
        </h1>
      </section>
    </div>
  );
};

export default WebLander;
