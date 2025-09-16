// Import React hooks and libraries
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

function Login() {
  // States for form and messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Load saved email if it exists
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  // Handle login form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    // Send login request to backend 
    axios
      .post("http://localhost:3001/login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
        rememberMe: remember,
      })
      .then((result) => {
        if (result.data.message === "Login successful") {
          setMessage("✅ Login successful!");

       
  

          //  Save email if remember checked
          if (remember) {
            localStorage.setItem("savedEmail", email);
          } else {
            localStorage.removeItem("savedEmail");
          }

          //  Save username and email for later use
          if (result.data.user) {
            console.log("User received from backend:", result.data.user); // ✅ debug
            localStorage.setItem("username", result.data.user.name);
            localStorage.setItem("userEmail", result.data.user.email);
          }

          // Redirect to /board
          setTimeout(() => {
            navigate("/board");
          }, 800);
        } else {

          // If backend sends error message
          setMessage(result.data.message);
        }
      })
      .catch((err) => {
         // Handle network or server errors
        if (err.response && err.response.data.message) {
          setMessage("❌ " + err.response.data.message);
        } else {
          setMessage("❌ Something went wrong. Try again.");
        }
      });
  };

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
          {/* Email */}
          <div className="mb-3">
            <label>
              <strong>Email</strong>
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
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
            <label>
              <strong>Password</strong>
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
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

          {/* Remember Me */}
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

          {/* Button */}
          <button
            type="submit"
            className="btn w-100"
            style={{
              background: "linear-gradient(90deg, #4facfe, #00f2fe)",
              color: "white",
            }}
          >
            Login
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`alert mt-3 ${
              message.includes("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        {/* Links */}
        <p className="mt-3 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-decoration-none fw-bold"
            style={{ color: "#4facfe" }}
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
