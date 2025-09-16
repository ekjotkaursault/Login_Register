const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5179" })); // React frontend

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/employee")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// ✅ Register Route
app.post("/register", (req, res) => {
  let { name, email, password } = req.body;

  // normalize
  email = email.trim().toLowerCase();
  password = password.trim();

  EmployeeModel.findOne({ email })
    .then(existing => {
      if (existing) {
        return res.status(400).json({ message: "Email already exists. Please login." });
      }

      return EmployeeModel.create({ name, email, password })
        .then(user => res.json({ message: "User registered successfully", user }))
        .catch(err => res.status(500).json({ message: "Error saving user: " + err.message }));
    })
    .catch(err => res.status(500).json({ message: "Server error: " + err.message }));
});

// ✅ Login Route
app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  // normalize
  email = email.trim().toLowerCase();
  password = password.trim();

  try {
    const user = await EmployeeModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email not found. Please try again." });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials, please try again." });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

app.listen(3001, () => {
  console.log("🚀 Server running on port 3001");
});
