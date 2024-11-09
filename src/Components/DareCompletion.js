import React, { useEffect, useState } from "react";
import "./DareCompletion.css";

const DareCompletion = ({ username }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [completedFive, setCompletedFive] = useState(false);

  const completeDare = async () => {
    console.log("Username being sent:", username); // Log the username
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:5001/api/complete-dare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }), // Ensure this is defined
      });

      const data = await response.json();
      // if (!response.ok) throw new Error(data.message);
      if (data.compeltedFive) {
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
