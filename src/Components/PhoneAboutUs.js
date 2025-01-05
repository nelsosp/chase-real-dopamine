import { useEffect } from "react";
import personalimage from "../assets/Personal.jpg";
import image from "../assets/PhoneAboutUs.jpg";
import MenuBar from "./MenuBar";
import "./PhoneAboutUs.css";
import UsernameBar from "./UsernameBar";

const PhoneAboutUs = () => {
  useEffect(() => {
    document.body.classList.add("phone-body");
    document.documentElement.classList.add("phone-html");

    return () => {
      document.body.classList.remove("phone-body");
      document.documentElement.classList.remove("phone-html");
    };
  }, []);
  return (
    <div className="phone-about-us">
      <div className="phone-about-us-title">Dopamine Dares</div>
      <MenuBar />
      <UsernameBar />
      <img src={image} alt="Background" className="background-image" />
      <div className="phone-about-us-message">
        In a screen-eccentric world, Dopamine Dares aims to inspire individuals
        to disconnect from the digital noise and reconnect with real-life
        experiences. Our mission is to motivate and empower users to explore,
        engage, and find true happiness through activities that promote
        well-being, connection, and fulfillment.
      </div>
      <img
        src={personalimage}
        alt="Background"
        className="background-image-phone-personal"
      />
      <div className="phone-personal-text-field">
        Responsible for the planning, architecture/design, and full-stack
        development of this application, with a deep passion for creating
        meaningful experiences that inspire people to appreciate and embrace
        life.
      </div>
    </div>
  );
};

export default PhoneAboutUs;
