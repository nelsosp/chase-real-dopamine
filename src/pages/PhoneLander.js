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
      <div className="phone-lander-title">Dopamine Dares</div>
      <MenuBar />
      <UsernameBar />
      <div className="image-container">
        <img src={image} alt="Background" className="phone-lander-image" />
      </div>
      <button className="phone-lander-button" onClick={handleUserNav}>
        Start Your Journey
      </button>
    </div>
  );
};

export default PhoneLander;
