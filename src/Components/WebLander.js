import { useEffect } from "react";
import video from "../assets/WebLander.mp4";
import MenuBar from "./MenuBar";
import UsernameBar from "./UsernameBar";
import "./WebLander.css";

const WebLander = () => {
  useEffect(() => {
    document.body.classList.add("web-body");
    document.documentElement.classList.add("web-html");

    return () => {
      document.body.classList.remove("web-body");
      document.documentElement.classList.remove("web-html");
    };
  }, []);
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
    </div>
  );
};

export default WebLander;
