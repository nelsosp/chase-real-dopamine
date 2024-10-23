import React, { useEffect } from 'react';
import './WebDareFinder.css';
import video from '../assets/WebDareFinder.mp4'

const WebDareFinder = ({ dare, error, fetchDare }) => {
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
            <video className="background-video" src={video} muted loop autoPlay></video>
            <h1>Daily Dare</h1>
            <button onClick={fetchDare} className="dare-button">
                Get Today's Dare
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {dare && <p className="web-dare-text">{dare}</p>}
        </div>
    );
};

export default WebDareFinder;
