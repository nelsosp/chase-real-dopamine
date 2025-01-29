import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneLogin from "./PhoneLogin";
import WebLogin from "./WebLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageIndex, setMessageIndex] = useState(-1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const messages = [
    "Today, the world spends half their life behind a screen",
    "Dopamine Dares rises to this problem to promote a challenge to you",
    "Chase Real Dopamine",
  ];
  const navigate = useNavigate();

  const getBackendUrl = () => {
    if (window.location.hostname === "localhost") {
      return "http://localhost:5001"; // For local development
    } else {
      // Use the Cloud Run URL for the backend
      return "https://chase-real-dopamine-backend-1047292940162.us-central1.run.app";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(false);

    const backendUrl = getBackendUrl(); // Get the correct backend URL
    const normalizedUsername = username.toLowerCase();
    const normalizedEmail = email.toLowerCase();
    try {
      const response = await fetch(`${backendUrl}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: normalizedUsername,
          email: normalizedEmail,
          action: "login",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", normalizedUsername);
      localStorage.setItem("email", normalizedEmail);
      setSuccessMessage("Login successful!");
      setIsLoading(true);

      // Check if the user has already seen the hero message
      const hasSeenHeroMessage = localStorage.getItem("hasSeenHeroMessage");

      if (hasSeenHeroMessage === "true") {
        // If the user has seen the hero message, skip the messages and go directly to the next page
        navigate("/dare-finder", { state: { username: normalizedUsername } });
      } else {
        // If the user hasn't seen the hero message, show the messages
        fadeToBlackAndDisplayMessages();
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const backendUrl = getBackendUrl(); // Get the correct backend URL
    const normalizedUsername = username.toLowerCase();
    const normalizedEmail = email.toLowerCase();
    try {
      const response = await fetch(`${backendUrl}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: normalizedUsername,
          email: normalizedEmail,
          action: "create",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setSuccessMessage("User created successfully! You can now log in.");
    } catch (err) {
      setError(err.message);
    }
  };

  const fadeToBlackAndDisplayMessages = () => {
    document.body.classList.add("fade-to-black");

    setTimeout(() => {
      displayMessages();
    }, 2000);
  };

  const displayMessages = () => {
    let index = 0;

    const showNextMessage = async () => {
      setIsFadingOut(false);
      setMessageIndex(index);
      index++;

      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(async () => {
          setMessageIndex(-1);
          if (index < messages.length) {
            setTimeout(showNextMessage, 1000);
          } else {
            // Once all messages have been shown, set the localStorage flag
            localStorage.setItem("hasSeenHeroMessage", "true");

            // Navigate to the next page
            const normalizedUsername = localStorage.getItem("username");
            navigate("/dare-finder", {
              state: { username: normalizedUsername },
            });
            setTimeout(() => {
              document.body.classList.remove("fade-to-black");
            }, 100);
          }
        }, 1000);
      }, 4000);
    };

    showNextMessage();
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 431);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 431);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="login-container">
      {isMobile ? (
        <PhoneLogin
          username={username}
          setUsername={setUsername}
          setEmail={setEmail}
          handleLogin={handleLogin}
          handleCreateUser={handleCreateUser}
          error={error}
          successMessage={successMessage}
          isLoading={isLoading}
          messageIndex={messageIndex}
          isFadingOut={isFadingOut}
          messages={messages}
        />
      ) : (
        <WebLogin
          username={username}
          setUsername={setUsername}
          setEmail={setEmail}
          handleLogin={handleLogin}
          handleCreateUser={handleCreateUser}
          error={error}
          successMessage={successMessage}
          isLoading={isLoading}
          messageIndex={messageIndex}
          isFadingOut={isFadingOut}
          messages={messages}
        />
      )}
    </div>
  );
};

export default Login;
