import video from "../assets/Login.mp4";
import "./WebLogin.css";

const WebLogin = ({
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
        <div className="web-page-container">
          <video
            className="background-video"
            src={video}
            muted
            loop
            autoPlay
          ></video>
          <h1>Dopamine Dares</h1>
          <div className="web-login-container">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}

            <div>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="button" onClick={handleLogin}>
              Login
            </button>
            <button type="button" onClick={handleCreateUser}>
              Create User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WebLogin;
