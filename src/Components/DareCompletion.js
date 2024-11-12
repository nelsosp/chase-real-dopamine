import React, { useEffect, useState } from "react";
import "./DareCompletion.css";

const DareCompletion = ({ username }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [completedFive, setCompletedFive] = useState(false);

  const getBackendUrl = () => {
    if (window.location.hostname === "localhost") {
      return "http://localhost:5001"; // For local development
    } else {
      // Use the Cloud Run URL for the backend
      return "https://chase-real-dopamine-backend-1047292940162.us-central1.run.app";
    }
  };

  const completeDare = async () => {
    console.log("Username being sent:", username); // Log the username
    setLoading(true);
    setMessage("");
    setError("");

    const backendUrl = getBackendUrl(); // Get the correct backend URL

    try {
      const response = await fetch(`${backendUrl}/api/complete-dare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }), // Send the username in the request body
      });

      const data = await response.json();
      if (data.completedFive) {
        setMessage(data.message);
        setCompletedFive(true);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setError("Error completing dare: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (completedFive) {
      setTimeout(() => {
        setMessage(
          "Your journey is growing. You've completed 5 dares, keep going."
        );
      }, 1000);
    }
  }, [completedFive]);

  return (
    <div>
      <button onClick={completeDare} disabled={loading}>
        {loading ? "Completing..." : "Complete Dare"}
      </button>
      {message && (
        <div className={`message ${completedFive ? "fade-out" : "fade-in"}`}>
          <p style={{ color: completedFive ? "green" : "white" }}>{message}</p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DareCompletion;
