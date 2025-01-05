import React, { useState } from "react";
import PhoneAboutUs from "./PhoneAboutUs";
import WebAboutUs from "./WebAboutUs";

const AboutUs = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 431);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 431);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <>{isMobile ? <PhoneAboutUs /> : <WebAboutUs />}</>;
};

export default AboutUs;
