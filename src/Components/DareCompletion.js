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
      return "https://chase-real-dopamine-backend-1047292940162.us-central1.run.app";
    }
  };

  const handleDareAction = async (action) => {
    console.log(`Action being sent: ${action}, Username: ${username}`);
    setLoading(true);
    setMessage("");
    setError("");

    const backendUrl = getBackendUrl();

    try {
      const response = await fetch(`${backendUrl}/api/complete-dare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, action }), // Send the action (complete or fail)
      });

      const data = await response.json();
      if (data.completedFive) {
        setMessage(data.message);
        setCompletedFive(true);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setError("Error processing dare action: " + err.message);
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
      <button
        className="complete-btn"
        onClick={() => handleDareAction("complete")}
        disabled={loading}
      >
        {loading ? "Completing..." : "Complete Dare"}
      </button>

      <button
        className="chicken-out-btn"
        onClick={() => handleDareAction("fail")}
        disabled={loading}
      >
        {loading ? "Failing..." : "Fail Dare"}
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
