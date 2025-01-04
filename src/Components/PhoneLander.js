import { useEffect } from "react";
import image from "../assets/PhoneLander.jpg";
import MenuBar from "./MenuBar";
import "./PhoneLander.css";
import UsernameBar from "./UsernameBar";

const PhoneLander = () => {
  useEffect(() => {
    document.body.classList.add("phone-body");
    document.documentElement.classList.add("phone-html");

    return () => {
      document.body.classList.remove("phone-body");
      document.documentElement.classList.remove("phone-html");
    };
  }, []);
  return (
    <div className="phone-lander">
      <div className="phone-lander-title">Dopamine Dares</div>
      <MenuBar />
      <UsernameBar />
      <img src={image} alt="Background" className="background-image" />
    </div>
  );
};

export default PhoneLander;
