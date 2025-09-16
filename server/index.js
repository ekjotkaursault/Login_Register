// Import express for creating the server
const express = require("express");

// Import mongoose to connect with MongoDB
const mongoose = require("mongoose");

// Import CORS to allow requests from frontend (React)
const cors = require("cors");

// Import Employee model (schema for users)
const EmployeeModel = require("./models/Employee");

// Create an express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS so frontend (React on port 5173) can talk to backend
app.use(cors({ origin: "http://localhost:5173" })); 


// Connect to MongoDB

mongoose.connect("mongodb://127.0.0.1:27017/employee")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));


// Register Route (POST)

app.post("/register", (req, res) => {
  let { name, email, password } = req.body;

  // Normalize inputs
  email = email.trim().toLowerCase();
  password = password.trim();

  // Check if email already exists in database
  EmployeeModel.findOne({ email })
    .then(existing => {
      if (existing) {
        return res.status(400).json({ message: "Email already exists. Please login." });
      }

      // Create new user in database
      return EmployeeModel.create({ name, email, password })
        .then(user => res.json({ message: "User registered successfully", user }))
        .catch(err => res.status(500).json({ message: "Error saving user: " + err.message }));
    })
    .catch(err => res.status(500).json({ message: "Server error: " + err.message }));
});


// Login Route (POST)

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  // Normalize inputs
  email = email.trim().toLowerCase();
  password = password.trim();

  try {
    // Find user by email
    const user = await EmployeeModel.findOne({ email });

    // If email not found
    if (!user) {
      return res.status(400).json({ message: "Email not found. Please try again." });
    }

    // If password doesn’t match
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials, please try again." });
    }

    // Success
    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});


// Start the server

app.listen(3001, () => {
  console.log("🚀 Server running on port 3001");
});
