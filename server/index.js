// Import required modules
const express = require("express");        // For creating the server
const mongoose = require("mongoose");      // For MongoDB connection
const cors = require("cors");              // To allow frontend (React) to call backend
const EmployeeModel = require("./models/Employee"); // Import Employee schema/model

// Create express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors({ origin: "http://localhost:5173" })); // Allow React app to connect (Vite runs on port 5173)

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/employee")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

/* -- REGISTER ROUTE -- */
app.post("/register", (req, res) => {
  let { name, email, password } = req.body;

  // Normalize input
  email = email.trim().toLowerCase();
  password = password.trim();

  // Check if email already exists
  EmployeeModel.findOne({ email })
    .then(existing => {
      if (existing) {
        return res.status(400).json({ message: "Email already exists. Please login." });
      }

      // Create new user
      return EmployeeModel.create({ name, email, password })
        .then(user => res.json({ message: "✅ User registered successfully!", user }))
        .catch(err => res.status(500).json({ message: "Error saving user: " + err.message }));

        user: user // send back the new user
    })
    .catch(err => res.status(500).json({ message: "Server error: " + err.message }));
});

/* -- LOGIN ROUTE -- */

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  EmployeeModel.findOne({ email, password })
    .then(user => {
      if (user) {
        // ✅ explicitly return name + email
        res.json({
          message: "Login successful",
          user: user
        });
      } else {
        res.json({ message: "Invalid credentials" });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});


/* --START SERVER -- */
app.listen(3001, () => {
  console.log("🚀 Server running on port 3001");
});
