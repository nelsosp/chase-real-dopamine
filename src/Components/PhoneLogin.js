// PhoneLogin.js
import React from 'react';
import './PhoneLogin.css'

const PhoneLogin = ({ username, setUsername, handleLogin, handleCreateUser, error, successMessage, isLoading, messageIndex, isFadingOut, messages }) => (
    <div className="phone-login-container">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        
        {messageIndex !== -1 && (
            // may need to change message className for phone and web
            <div className={`message ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
                {messages[messageIndex]}
            </div>
        )}
    
        <form className={isLoading ? 'fade-out' : ''}>
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
            <button type="button" onClick={handleLogin}>Login</button>
            <button type="button" onClick={handleCreateUser}>Create User</button>
        </form>
    </div>
);

export default PhoneLogin;
