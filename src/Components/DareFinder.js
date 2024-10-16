import React, { useState } from 'react';
import PhoneDareFinder from './PhoneDareFinder';
import WebDareFinder from './WebDareFinder';

const DareFinder = () => {
    const [dare, setDare] = useState('');
    const [error, setError] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 430);

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

    const handleResize = () => {
        setIsMobile(window.innerWidth < 430);
    };

    React.useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {isMobile ? (
                <PhoneDareFinder
                    dare={dare}
                    setDare={setDare}
                    error={error}
                    setError={setError}
                    fetchDare={fetchDare}
                />
            ) : (
                <WebDareFinder
                    dare={dare}
                    setDare={setDare}
                    error={error}
                    setError={setError}
                    fetchDare={fetchDare}
                />
            )}
        </>
    );
};

export default DareFinder;
