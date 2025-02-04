import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/PhoneLander.jpg";
import MenuBar from "./MenuBar";
import "./PhoneLander.css";
import UsernameBar from "./UsernameBar";

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
      <div className="phone-lander-title">Dopamine Dares</div>
      <MenuBar />
      <UsernameBar />
      <img src={image} alt="Background" className="background-image" />
      <button className="phone-lander-button" onClick={handleUserNav}>
        Start Your Journey
      </button>
    </div>
  );
};

export default PhoneLander;
