import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PhoneDareFinder from "./PhoneDareFinder";
import WebDareFinder from "./WebDareFinder";

const DareFinder = () => {
  const location = useLocation();
  const { username } = location.state || {};

  const [dare, setDare] = useState("");
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 430);

  const getBackendUrl = () => {
    if (window.location.hostname === "localhost") {
      return "http://localhost:5001"; // For local development
    } else {
      // Use the Cloud Run URL for the backend
      return "https://chase-real-dopamine-backend-1047292940162.us-central1.run.app";
    }
  };

  const fetchDare = async () => {
    const backendUrl = getBackendUrl(); // Get the correct backend URL

    try {
      const response = await fetch(`${backendUrl}/dare`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setDare(data.dare);
    } catch (err) {
      console.error("Error fetching dare:", err);
      setError("Failed to fetch dare.");
    }
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 430);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <PhoneDareFinder
          dare={dare}
          setDare={setDare}
          error={error}
          setError={setError}
          fetchDare={fetchDare}
          username={username}
        />
      ) : (
        <WebDareFinder
          dare={dare}
          setDare={setDare}
          error={error}
          setError={setError}
          fetchDare={fetchDare}
          username={username}
        />
      )}
    </>
  );
};

export default DareFinder;
