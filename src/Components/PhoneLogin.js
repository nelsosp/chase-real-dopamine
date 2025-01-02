import image from "../assets/PhoneLogin.jpg";
import "./PhoneLogin.css";
import PhoneMenuBar from "./PhoneMenuBar";

const PhoneLogin = ({
  username,
  setUsername,
  handleLogin,
  handleCreateUser,
  error,
  successMessage,
  isLoading,
  messageIndex,
  isFadingOut,
  messages,
}) => {
  return (
    <div>
      {messageIndex !== -1 && (
        <div className={`message ${isFadingOut ? "fade-out" : "fade-in"}`}>
          {messages[messageIndex]}
        </div>
      )}
      <form className={isLoading ? "fade-out" : ""}>
        <div className="phone-page-container">
          <img src={image} alt="Background" className="background-image" />
          <div>
            <PhoneMenuBar />
          </div>
          <h1>Dopamine Dares</h1>
          <div className="phone-login-container">
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
            <div>
              <label className="phone-input-fields">
                USERNAME
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
              {/* this is for future implementation of taking emails in */}
              <label className="phone-input-fields">
                EMAIL
                <input type="text" />
              </label>
              <a href="/forgot-password" className="phone-forgot-password-link">
                forgot username?
              </a>
            </div>
            <button
              className="phone-login-button"
              type="button"
              onClick={handleLogin}
            >
              LOG IN
            </button>
            <button
              className="phone-create-user-button"
              type="button"
              onClick={handleCreateUser}
            >
              CREATE USER
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PhoneLogin;
