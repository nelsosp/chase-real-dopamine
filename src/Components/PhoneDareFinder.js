import React, { useEffect } from "react";
import image from "../assets/PhoneDareFinder.jpg";
import DareCompletion from "./DareCompletion";
import "./PhoneDareFinder.css";

const PhoneDareFinder = ({ dare, error, fetchDare, username }) => {
  useEffect(() => {
    document.body.classList.add("phone-body");
    document.documentElement.classList.add("phone-html");

    return () => {
      document.body.classList.remove("phone-body");
      document.documentElement.classList.remove("phone-html");
    };
  }, []);

  return (
    <div className="phone-dare-container">
      <img src={image} alt="Background" className="background-image" />
      <h1>Daily Dare</h1>
      <button onClick={fetchDare} className="dare-button">
        Get Today's Dare
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {dare && <p className="phone-dare-text">{dare}</p>}
      {dare && <DareCompletion username={username} />}
    </div>
  );
};

export default PhoneDareFinder;
