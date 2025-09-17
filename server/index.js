const express = require("express");        
const mongoose = require("mongoose");      
const cors = require("cors");              
const EmployeeModel = require("./models/Employee"); 

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors({ origin: "http://localhost:5173" })); 

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/employee")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

/* -- REGISTER ROUTE -- */
app.post("/register", (req, res) => {
  let { name, email, password } = req.body;

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

/* -- LOGIN ROUTE -- */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  EmployeeModel.findOne({ email, password })
    .then(user => {
      if (user) {
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
