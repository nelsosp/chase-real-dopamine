import './PhoneLogin.css';

const PhoneLogin = ({ username, setUsername, handleLogin, handleCreateUser, error, successMessage, isLoading, messageIndex, isFadingOut, messages }) => {

    return (
        <div>
            {messageIndex !== -1 && (
            <div className={`message ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
                {messages[messageIndex]}
            </div>
        )}
        <form className={isLoading ? 'fade-out' : ''}>
        <div className='phone-page-container'>
            <h1>Dopamine Dares</h1>
            <div className="phone-login-container">
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
                    <button type="button" onClick={handleLogin}>Login</button>
                    <button type="button" onClick={handleCreateUser}>Create User</button>
               
            </div>
        </div>
        </form>
        </div>
    );
};

export default PhoneLogin;
