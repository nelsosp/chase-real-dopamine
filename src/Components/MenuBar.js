import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MenuBar.css";

const MenuBar = () => {
  // State to control the visibility of the menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Checking if user is logged in by checking token, related to Dare route
  const isLoggedIn = localStorage.getItem("token") !== null;

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close the menu if clicked outside of it
  const closeMenu = (e) => {
    if (e.target.classList.contains("overlay")) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.body.classList.add("phone-body");
    document.documentElement.classList.add("phone-html");

    return () => {
      document.body.classList.remove("phone-body");
      document.documentElement.classList.remove("phone-html");
    };
  }, []);

  return (
    <div className="navigation-bar">
      <div className="yellow-circle" onClick={toggleMenu}></div>

      {/* Overlay and menu */}
      <div
        className={`overlay ${menuOpen ? "overlay-visible" : ""}`}
        onClick={closeMenu}
      >
        <div className={`menu ${menuOpen ? "menu-open" : ""}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#signup">Sign Up/Log In</a>
            </li>
            <li>
              {isLoggedIn ? (
                <Link to="/dare-finder">Dares</Link>
              ) : (
                <span></span>
              )}
            </li>
            <li>
              <a href="/about-us">About Us</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
