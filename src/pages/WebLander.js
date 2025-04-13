import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import video from "../assets/WebLander.mp4";
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
      <div className="web-lander-title">Dopamine Dares</div>
      <h1 className="web-lander-heading-1">Helping you reconnect with what really matters.</h1>
      <button className="web-lander-button" onClick={handleUserNav}>
        Start Your Journey
      </button>
      </section>
      <section className="section-2">
      <div className="web-lander-title-2">The Digital Drain Is Real</div>
      <h1 className="web-lander-heading-2">Distractions are stealing your most valuable resource. Your time.</h1>
      </section>
      <section className="section-3">
      <div className="web-lander-title-3">Meet Your Digital Reset Button</div>
      <h1 className="web-lander-heading-3">Our app gently motivates you to unplug and make space for real experiences, relationships, and personal joy.</h1>
      </section>
      <section className="section-4">
      <div className="web-lander-title-4">Three easy steps to start living more and scrolling less.</div>
      <h1 className="web-lander-heading-4">Sign Up, Track & Reflect, Act & Enjoy</h1>
      </section>
      <section className="section-5">
      <div className="web-lander-title-5">Enjoy Life Beyond the Screen</div>
      <h1 className="web-lander-heading-5">Wake up inspired, feeling more connected, and ending your day with memories.</h1>
      </section>
    </div>
  );
};

export default WebLander;
