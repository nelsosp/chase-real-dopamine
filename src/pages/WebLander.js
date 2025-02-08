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
      <div className="web-lander-title">Dopamine Dares</div>
      <MenuBar />
      <UsernameBar />
      <video
        className="background-video"
        src={video}
        muted
        loop
        autoPlay
      ></video>{" "}
      <button className="web-lander-button" onClick={handleUserNav}>
        Start Your Journey
      </button>
    </div>
  );
};

export default WebLander;
