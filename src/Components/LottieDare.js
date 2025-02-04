import React from "react";
import video from "../assets/Brain.mp4";
import "./LottieDare.css";

const LottieAnimation = () => {
  return (
    <div className="lottie-dare-video">
      <video autoPlay loop muted playsInline src={video} type="video/mp4" />
    </div>
  );
};

export default LottieAnimation;
