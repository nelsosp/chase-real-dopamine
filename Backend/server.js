const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const app = express();

const serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const corsOptions = {
  origin: "*", // Allow all origins (not recommended for production)
  methods: "GET, POST",
  allowedHeaders: "Content-Type",
};
app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON bodies

app.get("/dare/:timeOfDay/:category", async (req, res) => {
  const { timeOfDay, category } = req.params;

  try {
    // Fetch the 'timeOfDay' document (Morning, Afternoon, or Night)
    const daresRef = db.collection("Dares").doc(timeOfDay);
    const doc = await daresRef.get();

    if (!doc.exists) {
      return res
        .status(404)
        .json({ error: `No dares available for ${timeOfDay}` });
    }

    // Get the dares data from the specified category (CozyCorner, FreshAir, etc.)
    const dares = doc.data()[category];

    if (!dares || dares.length === 0) {
      return res
        .status(404)
        .json({ error: `No dares available for ${category} in ${timeOfDay}` });
    }

    // Return a random dare from the array of dares
    const randomDare = dares[Math.floor(Math.random() * dares.length)];
    res.json(randomDare);
  } catch (error) {
    console.error("Error fetching dare:", error);
    res.status(500).json({ error: "Failed to fetch dare" });
  }
});

// User Authentication/Login Page
app.post("/api/auth", async (req, res) => {
  const { username, email, action } = req.body;

  // Validate username and email
  if (!username || username.trim() === "") {
    return res.status(400).json({ message: "Username cannot be empty" });
  }
  if (!email || email.trim() === "") {
    return res.status(400).json({ message: "Email cannot be empty" });
  }

  // Normalize the username and email to lowercase
  const normalizedUsername = username.toLowerCase();
  const normalizedEmail = email.toLowerCase();

  try {
    const usersRef = db.collection("users");

    if (action === "create") {
      // If creating a user, ensure the username/email doesn't already exist
      const userQuery = await usersRef
        .where("username", "==", normalizedUsername)
        .where("email", "==", normalizedEmail)
        .get();

      if (userQuery.empty) {
        // Create new user document
        await usersRef.doc(normalizedUsername).set({
          username: normalizedUsername,
          email: normalizedEmail,
        });

        // Create corresponding userProgress document/collection
        const userProgressRef = db
          .collection("userProgress")
          .doc(normalizedUsername);
        await userProgressRef.set({ totalCompleted: 0 });

        return res.json({
          message: "User created successfully! You can now log in.",
        });
      } else {
        return res.status(400).json({
          message: "Username or email already exists. Please choose another.",
        });
      }
    } else if (action === "login") {
      // If logging in, check if the user exists with the same username/email
      const userQuery = await usersRef
        .where("username", "==", normalizedUsername)
        .where("email", "==", normalizedEmail)
        .get();

      if (!userQuery.empty) {
        return res.json({
          message: "Login successful",
          username: normalizedUsername,
          email: normalizedEmail,
        });
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

// Endpoint to handle incrementing totalCompleted count collection/document
app.post("/api/complete-dare", async (req, res) => {
  console.log("Request Body:", req.body);
  const { username, action } = req.body;

  if (!username || username.trim() === "") {
    return res.status(400).json({ message: "Username cannot be empty" });
  }

  if (!action || (action !== "complete" && action !== "fail")) {
    return res
      .status(400)
      .json({ message: "Invalid action. Must be 'complete' or 'fail'" });
  }

  try {
    const userProgressRef = db.collection("userProgress").doc(username);
    const userProgressDoc = await userProgressRef.get();

    if (userProgressDoc.exists) {
      const currentTotal = userProgressDoc.data().totalCompleted;

      if (action === "complete") {
        await userProgressRef.update({
          totalCompleted: admin.firestore.FieldValue.increment(1),
        });

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
      } else if (action === "fail") {
        const newTotal = Math.max(0, currentTotal - 1); // Ensure it doesn't go below 0
        await userProgressRef.update({
          totalCompleted: newTotal,
        });

        return res.json({
          message: "Dare failure recorded successfully!",
          totalCompleted: newTotal,
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
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
