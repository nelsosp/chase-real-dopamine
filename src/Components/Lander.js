import React, { useState } from "react";
import PhoneLander from "./PhoneLander";
import WebLander from "./WebLander";

const Lander = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 431);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 431);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <>{isMobile ? <PhoneLander /> : <WebLander />}</>;
};

export default Lander;
