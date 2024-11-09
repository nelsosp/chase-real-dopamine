import React, { useState } from "react";

const DareCompletion = ({ username }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
      if (!response.ok) throw new Error(data.message);

      setMessage(data.message);
    } catch (err) {
      setError("Error completing dare: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={completeDare} disabled={loading}>
        {loading ? "Completing..." : "Complete Dare"}
      </button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DareCompletion;
