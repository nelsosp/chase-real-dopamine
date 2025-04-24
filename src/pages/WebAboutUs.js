import { useEffect } from "react";
import personalimage from "../assets/Personal.jpg";
// import video from "../assets/WebAboutUs.mp4";
import MenuBar from "../Components/MenuBar";
import UsernameBar from "../Components/UsernameBar";
import "./WebAboutUs.css";

const WebAboutUs = () => {
  useEffect(() => {
    document.body.classList.add("web-body");
    document.documentElement.classList.add("web-html");

    return () => {
      document.body.classList.remove("web-body");
      document.documentElement.classList.remove("web-html");
    };
  }, []);
  return (
    <div className="web-about-us">
      <div className="web-about-us-title">Dopamine Dares</div>
      <MenuBar />
      <UsernameBar />
      {/* <video
        className="background-video"
        src={video}
        muted
        loop
        autoPlay
      ></video>{" "} */}
      <div className="web-about-us-message">
        In a screen-eccentric world, Dopamine Dares aims to inspire individuals
        to disconnect from the digital noise and reconnect with real-life
        experiences. Our mission is to motivate and empower users to explore,
        engage, and find true happiness through activities that promote
        well-being, connection, and fulfillment.
      </div>
      <img
        src={personalimage}
        alt="Background"
        className="background-image-web-personal"
      />
      <div className="web-personal-text-field">
        Responsible for the planning, architecture/design, and full-stack
        development of this application, with a deep passion for creating
        meaningful experiences that inspire people to appreciate and embrace
        life.
      </div>
    </div>
  );
};

export default WebAboutUs;
