// Import React hooks and libraries
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // navigation and links
import axios from "axios";  // for API calls
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // icons for inputs
import { motion } from "framer-motion"; // animation

function Signup() {
// Local states for form inputs and messages

  const [name, setName] = useState(""); // username
  const [email, setEmail] = useState(""); // email
  const [password, setPassword] = useState(""); // password
  const [message, setMessage] = useState(""); //success/error messages
  const navigate = useNavigate(); // for programmatic navigation

  // Handle form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");   

    // send request to backend for registration
    axios.post("http://localhost:3001/register", { name, email, password })
      .then((result) => {
        setMessage(result.data.message);

          // If registration is successful, redirect to login after 1.5s
        if (result.data.message === "User registered successfully") {
          setTimeout(() => navigate("/login"), 1500);
        }

        // Save username in localStorage (for display later) 
        if (result.data.user) {
  localStorage.setItem("username", result.data.user.name);
}


      })
      .catch((err) => {

        // Handle backend or network errors
        if (err.response && err.response.data.message) {
          setMessage("❌ " + err.response.data.message);
        } else {
          setMessage("❌ Something went wrong. Try again.");
        }
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
         style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
     
      {/* Signup box with animation */}

      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-4 rounded shadow-lg"
        style={{ width: "350px" }}
      >
        <h2 className="text-center mb-4">✨ Register</h2>

    {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label><strong>Name</strong></label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input 
                type="text" 
                className="form-control"
                placeholder="Enter Name" 
                value={name}
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
          </div>

          {/* Email input */}
          <div className="mb-3">
            <label><strong>Email</strong></label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input 
                type="email" 
                className="form-control"
                placeholder="Enter Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label><strong>Password</strong></label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input 
                type="password" 
                className="form-control"
                placeholder="Enter Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
          </div>


          {/* Submit button */}
          <button 
            type="submit" 
            className="btn w-100"
            style={{ background: "linear-gradient(90deg, #667eea, #764ba2)", color: "white" }}
          >
            Register
          </button>
        </form>


        {/* Display success/error message */}
        {message && (
          <div className={`alert mt-3 ${message.includes("✅") || message.includes("successfully") 
            ? "alert-success" : "alert-danger"}`}>
            {message}
          </div>
        )}


        {/* Link to login page */}
        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none fw-bold" style={{ color: "#667eea" }}>
            Login
          </Link>
        </p>

          {/* Button to navigate to login page */}
        <Link to="/login" className="btn btn-light border w-100 mt-2">Login</Link>
      </motion.div>
    </div>
  );
}

export default Signup;
