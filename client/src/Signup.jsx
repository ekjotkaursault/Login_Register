// Import useState hook for managing form inputs
import { useState } from "react";

// Import Link for navigation and useNavigate for redirecting after signup
import { Link, useNavigate } from "react-router-dom";

// Import axios to make API requests to the backend
import axios from "axios";

// Import icons for Name, Email, and Password fields
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

// Import motion for smooth animations
import { motion } from "framer-motion";

function Signup() {
  // State to store form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for success/error messages
  const [message, setMessage] = useState("");

  // Hook to redirect user after signup
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    setMessage("");     // clear old message

    // Send data to backend for registration
    axios.post("http://localhost:3001/register", { name, email, password })
      .then((result) => {
        setMessage(result.data.message); // show backend message

        // If signup is successful, redirect to Login page
        if (result.data.message === "User registered successfully") {
          setTimeout(() => navigate("/login"), 1500);
        }
      })
      .catch((err) => {
        // Show error message if backend sends one
        if (err.response && err.response.data.message) {
          setMessage("❌ " + err.response.data.message);
        } else {
          setMessage("❌ Something went wrong. Try again.");
        }
      });
  };

  return (
    // Center the signup form on the page
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
    >
      {/* Add motion for fade-in animation */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-4 rounded shadow-lg"
        style={{ width: "350px" }}
      >
        <h2 className="text-center mb-4">✨ Register</h2>

        {/* Signup form */}
        <form onSubmit={handleSubmit}>
          {/* Name field */}
          <div className="mb-3">
            <label><strong>Name</strong></label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input type="text" className="form-control"
                placeholder="Enter Name" value={name}
                onChange={(e) => setName(e.target.value)} required />
            </div>
          </div>

          {/* Email field */}
          <div className="mb-3">
            <label><strong>Email</strong></label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input type="email" className="form-control"
                placeholder="Enter Email" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          {/* Password field */}
          <div className="mb-3">
            <label><strong>Password</strong></label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input type="password" className="form-control"
                placeholder="Enter Password" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>

          {/* Submit button */}
          <button type="submit" 
            className="btn w-100"
            style={{ background: "linear-gradient(90deg, #667eea, #764ba2)", color: "white" }}>
            Register
          </button>
        </form>

        {/* Show success or error message */}
        {message && (
          <div className={`alert mt-3 ${message.includes("✅") || message.includes("successfully") 
              ? "alert-success" : "alert-danger"}`}>
            {message}
          </div>
        )}

        {/* Links to go back to Login */}
        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none fw-bold" style={{ color: "#667eea" }}>
            Login
          </Link>
        </p>

        <Link to="/login" className="btn btn-light border w-100 mt-2">Login</Link>
      </motion.div>
    </div>
  );
}

export default Signup;
