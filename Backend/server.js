const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();

const serviceAccount = require('./config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Existing get request for dares
app.get('/dare', async (req, res) => {
    try {
        const daresRef = db.collection('dares');
        const snapshot = await daresRef.get();

        if (snapshot.empty) {
            return res.status(404).json({ error: 'No dares available' });
        }

        const dares = snapshot.docs.map(doc => doc.data());
        const randomDare = dares[Math.floor(Math.random() * dares.length)];

        res.json({ dare: randomDare.text });
    } catch (error) {
        console.error('Error fetching dares:', error);
        res.status(500).json({ error: 'Failed to fetch dare' });
    }
});

// User authentication route
app.post('/api/auth', async (req, res) => {
    const { username, action } = req.body;

    // Validate username
    if (!username || username.trim() === '') {
        return res.status(400).json({ message: 'Username cannot be empty' });
    }

    try {
        const userRef = db.collection('users').doc(username);
        const userDoc = await userRef.get();

        if (action === 'create') {
            // If creating a user and they don't exist, create one
            if (!userDoc.exists) {
                await userRef.set({ username });
                return res.json({ message: 'User created successfully! You can now log in.' });
            } else {
                return res.status(400).json({ message: 'Username already exists. Please choose another.' });
            }
        } else if (action === 'login') {
            // If logging in, check if the user exists
            if (userDoc.exists) {
                return res.json({ message: 'Login successful', username });
            } else {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
