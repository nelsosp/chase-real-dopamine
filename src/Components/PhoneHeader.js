import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PhoneHeader.css"; // Optional CSS file for styling

const PhoneHeader = () => {
  const [username, setUsername] = useState(null);
  const [showLogout, setShowLogout] = useState(false); // New state to manage the visibility of logout option
  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const storedUsername = localStorage.getItem("username"); // Assuming username is stored too
      setUsername(storedUsername);
    }
  }, []);

  const handleSignIn = () => {
    navigate("/"); // Navigate to the login page
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // Clear username too
    setUsername(null); // Update state to reflect that the user is logged out
    setShowLogout(false); // Hide the logout button after logging out
  };

  const handleUsernameClick = () => {
    // Toggle the visibility of the logout button
    setShowLogout((prevState) => !prevState);
  };

  return (
    <header className="header">
      <div className="header-right">
        {username ? (
          <div className="user-logged-in">
            <span onClick={handleUsernameClick} className="username">
              {username}
            </span>
            {showLogout && (
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            )}
          </div>
        ) : (
          <button className="sign-in-button" onClick={handleSignIn}>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default PhoneHeader;
