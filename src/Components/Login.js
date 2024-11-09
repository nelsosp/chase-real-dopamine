// Login.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneLogin from "./PhoneLogin";
import WebLogin from "./WebLogin";

const Login = () => {
  const [username, setUsername] = useState("");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(false);

    try {
      const response = await fetch("http://localhost:5001/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, action: "login" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setSuccessMessage("Login successful!");
      setIsLoading(true);
      fadeToBlackAndDisplayMessages();
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5001/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, action: "create" }),
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

    const showNextMessage = () => {
      setIsFadingOut(false);
      setMessageIndex(index);
      index++;

      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setMessageIndex(-1);
          if (index < messages.length) {
            setTimeout(showNextMessage, 1000);
          } else {
            navigate("/dare-finder", { state: { username } });
            setTimeout(() => {
              document.body.classList.remove("fade-to-black");
            }, 100);
          }
        }, 1000);
      }, 4000);
    };

    showNextMessage();
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 430);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 430);
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
