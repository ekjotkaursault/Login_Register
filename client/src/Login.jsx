import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false); // ✅ checkbox state
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    axios.post("http://localhost:3001/login", { 
      email: email.trim().toLowerCase(), 
      password: password.trim(),
      rememberMe: remember  // ✅ send to backend if needed
    })
      .then((result) => {
        if (result.data.message === "Login successful") {
          setMessage("✅ Login successful!");
          
          // ✅ Save email to localStorage if checked
          if (remember) {
            localStorage.setItem("savedEmail", email);
          } else {
            localStorage.removeItem("savedEmail");
          }

          setTimeout(() => {
            window.location.href = "https://github.com/ekjotkaursault";
          }, 1200);
        } else {
          setMessage(result.data.message);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          setMessage("❌ " + err.response.data.message);
        } else {
          setMessage("❌ Something went wrong. Try again.");
        }
      });
  };

  // ✅ Load saved email if it exists
  useState(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#f0f4f8" }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-4 rounded shadow-lg"
        style={{ width: "350px" }}
      >
        <h2 className="text-center mb-4">🔑 Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label><strong>Email</strong></label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input type="email" className="form-control"
                placeholder="Enter Email" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="mb-3">
            <label><strong>Password</strong></label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input type="password" className="form-control"
                placeholder="Enter Password" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>

          {/* ✅ Remember Me checkbox */}
          <div className="form-check mb-3">
            <input 
              type="checkbox" 
              className="form-check-input"
              id="rememberMe"
              checked={remember}
              onChange={() => setRemember(!remember)} 
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>

          <button type="submit" 
            className="btn w-100"
            style={{ background: "linear-gradient(90deg, #4facfe, #00f2fe)", color: "white" }}>
            Login
          </button>
        </form>

        {message && (
          <div className={`alert mt-3 ${message.includes("✅") || message.includes("successful") 
              ? "alert-success" : "alert-danger"}`}>
            {message}
          </div>
        )}

        {/* Inline + Button links */}
        <p className="mt-3 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-decoration-none fw-bold" style={{ color: "#4facfe" }}>
            Register
          </Link>
        </p>

        <Link to="/register" className="btn btn-light border w-100 mt-2">Register</Link>
      </motion.div>
    </div>
  );
}

export default Login;
