const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();

// Initialize Firebase Admin
const serviceAccount = require('./config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(cors()); // Enable CORS for all routes

// Define the /dare endpoint
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
