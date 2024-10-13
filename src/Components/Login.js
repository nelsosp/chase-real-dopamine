import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messageIndex, setMessageIndex] = useState(-1);
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
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, action: 'login' }), // Indicate login
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            // console.log('Login successful:', data);
            localStorage.setItem('token', data.token); // Adjust based on your setup
            setSuccessMessage('Login successful!');

            fadeToBlackAndDisplayMessages();
        } catch (err) {
            setError(err.message);
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
                body: JSON.stringify({ username, action: 'create' }), // Indicate user creation
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            console.log('Data from Backend:', data);
            setSuccessMessage('User created successfully! You can now log in.');
        } catch (err) {
            setError(err.message);
        }
    };

    const fadeToBlackAndDisplayMessages = () => {
        document.body.classList.add('fade-to-black');

        setTimeout(() => {
            displayMessages();
        }, 1000);
    };

    const displayMessages = () => {
        messages.forEach((msg, index) => {
            setTimeout(() => {
                setMessageIndex(index);
                if (index === messages.length - 1) {
                    setTimeout(() => {
                        navigate('/dare-finder');
                    }, 2000);
                }
            }, index * 3000)
        })
    };

    return (
        <div className={`login-container ${isLoading ? 'fade-out' : ''}`}>
            <h2>Login / Create User</h2>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
            {messageIndex !== -1 && (
                <div className={`message fade ${messageIndex !== -1 ? 'show' : ''}`}>
                    {messages[messageIndex]}
                </div>
            )}
            <form>
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
