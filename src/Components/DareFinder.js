// DareFinder.js
import React, { useState } from 'react';

const DareFinder = () => {
    const [dare, setDare] = useState('');
    const [error, setError] = useState('');

    const fetchDare = async () => {
        try {
            const response = await fetch('http://localhost:5000/dare'); 
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setDare(data.dare); 
        } catch (err) {
            console.error('Error fetching dare:', err);
            setError('Failed to fetch dare.');
        }
    };
    

    return (
        <div>
            <h1>Daily Dare</h1>
            <button onClick={fetchDare} className="dare-button">
                Get Today's Dare
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {dare && <p className="dare-text">{dare}</p>}
        </div>
    );
};

export default DareFinder;
