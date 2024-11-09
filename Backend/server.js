const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const app = express();

const serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Existing get request for dares
app.get("/dare", async (req, res) => {
  try {
    const daresRef = db.collection("dares");
    const snapshot = await daresRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "No dares available" });
    }

    const dares = snapshot.docs.map((doc) => doc.data());
    const randomDare = dares[Math.floor(Math.random() * dares.length)];

    res.json({ dare: randomDare.text });
  } catch (error) {
    console.error("Error fetching dares:", error);
    res.status(500).json({ error: "Failed to fetch dare" });
  }
});

// User Authentication/Login Page
app.post("/api/auth", async (req, res) => {
  const { username, action } = req.body;

  // Validate username
  if (!username || username.trim() === "") {
    return res.status(400).json({ message: "Username cannot be empty" });
  }

  try {
    const userRef = db.collection("users").doc(username);
    const userDoc = await userRef.get();

    if (action === "create") {
      // If creating a user and they don't exist, create one
      if (!userDoc.exists) {
        await userRef.set({ username });

        //Create corresponding userProgress document/collection
        const userProgressRef = db.collection("userProgress").doc(username);
        await userProgressRef.set({ totalCompleted: 0 });

        return res.json({
          message: "User created successfully! You can now log in!!!!!!",
        });
      } else {
        return res
          .status(400)
          .json({ message: "Username already exists. Please choose another." });
      }
    } else if (action === "login") {
      // If logging in, check if the user exists
      if (userDoc.exists) {
        return res.json({ message: "Login successful", username });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// endpoint to handle incrementing totalCompleted count collection/document
// Endpoint to handle incrementing totalCompleted count and checking if 5 dares are completed
app.post("/api/complete-dare", async (req, res) => {
  console.log("Request Body:", req.body);
  const { username } = req.body;

  if (!username || username.trim() === "") {
    return res.status(400).json({ message: "Username cannot be empty" });
  }

  try {
    const userProgressRef = db.collection("userProgress").doc(username);
    const userProgressDoc = await userProgressRef.get();

    if (userProgressDoc.exists) {
      // Increment the totalCompleted field
      const currentTotal = userProgressDoc.data().totalCompleted;
      await userProgressRef.update({
        totalCompleted: admin.firestore.FieldValue.increment(1),
      });

      // Check if the user has completed 5 dares
      if (currentTotal + 1 === 5) {
        return res.json({
          message: "Congratulations! You’ve completed 5 dares!",
          completedFive: true, // Flag to indicate completion of 5 dares
        });
      } else {
        return res.json({
          message: "Dare completion recorded successfully!",
          completedFive: false,
        });
      }
    } else {
      return res.status(404).json({ message: "User progress not found." });
    }
  } catch (error) {
    console.error("Error updating user progress", error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
