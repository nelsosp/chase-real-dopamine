import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messageIndex, setMessageIndex] = useState(-1);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const messages = [
        "Today, the world spends half their life behind a screen",
        "Dopamine Dares rises to this problem to promote a challenge to you",
        "Chase Real Dopamine"
    ];
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsLoading(false);

        try {
            const response = await fetch('http://localhost:5000/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, action: 'login' }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            setSuccessMessage('Login successful!');
            setIsLoading(true);
            fadeToBlackAndDisplayMessages();
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, action: 'create' }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            // const data = await response.json();
            setSuccessMessage('User created successfully! You can now log in.');
        } catch (err) {
            setError(err.message);
        }
    };

    const fadeToBlackAndDisplayMessages = () => {
        document.body.classList.add('fade-to-black');

        setTimeout(() => {
            displayMessages();
        }, 2000);
    };

const displayMessages = () => {
    let index = 0;

    const showNextMessage = () => {
        setIsFadingOut(false); // Reset fading state
        setMessageIndex(index);
        index++;

        // Fade out after the message is displayed
        setTimeout(() => {
            setIsFadingOut(true); // Start fade out
            setTimeout(() => {
                setMessageIndex(-1); // Hide message
                if (index < messages.length) {
                    setTimeout(showNextMessage, 1000); // Wait before showing the next message
                } else {
                    navigate('/dare-finder');
                    // Remove fade-to-black class after navigation
                    setTimeout(() => {
                        document.body.classList.remove('fade-to-black');
                    }, 100); // Small delay to ensure class is removed after navigation
                }
            }, 1000); // Duration of fade out
        }, 4000); // Message duration before fading out
    };

    showNextMessage();
};


    return (
        <div className="login-container">
            <h2>Login / Create User</h2>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
            
            {messageIndex !== -1 && (
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
};

export default Login;
