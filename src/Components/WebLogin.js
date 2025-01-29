import video from "../assets/Login.mp4";
import MenuBar from "./MenuBar";
import "./WebLogin.css";

const WebLogin = ({
  username,
  setUsername,
  email,
  setEmail,
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
        <div className="web-page-container">
          <video
            className="background-video"
            src={video}
            muted
            loop
            autoPlay
          ></video>
          <div>
            <MenuBar />
          </div>
          <h1>Dopamine Dares</h1>
          <div className="web-login-container">
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
            <div>
              <label className="web-input-fields">
                USERNAME
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
              {/* this is for future implementation of taking emails in */}
              <label className="web-input-fields">
                EMAIL
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <a href="/forgot-password" className="web-forgot-password-link">
                forgot username?
              </a>
            </div>
            <button
              className="web-login-button"
              type="button"
              onClick={handleLogin}
            >
              LOG IN
            </button>
            <button
              className="web-create-user-button"
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

export default WebLogin;
