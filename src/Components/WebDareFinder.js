import React, { useEffect } from 'react';
import './WebDareFinder.css';

const WebDareFinder = ({ dare, setDare, error, setError, fetchDare }) => {
    useEffect(() => {
        document.body.classList.add('web-body');
        document.documentElement.classList.add('web-html');

        return () => {
            document.body.classList.remove('web-body');
            document.documentElement.classList.remove('web-html');
        };
    }, []);

    return (
        <div className="web-dare-container">
            <h1>Daily Dare - Web</h1>
            <button onClick={fetchDare} className="dare-button">
                Get Today's Dare
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {dare && <p className="dare-text">{dare}</p>}
        </div>
    );
};

export default WebDareFinder;
