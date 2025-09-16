import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // animation library
import Post from "./Post"; // import Post component for like/dislike

function DiscussionBoard() {
  const [username, setUsername] = useState("");

  // Load username from localStorage when page first loads
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    } else {
      console.log("⚠️ No username found in localStorage");
    }
  }, []);

  // Example discussion posts (static for now, could be dynamic later)
  const posts = [
    "What do you think about MERN stack?",
    "How do you handle MongoDB connections?",
    "React vs Angular: which do you prefer?",
    "What’s the biggest challenge you faced in web development?",
    "Do you prefer frontend or backend development, and why?",
    "How important is UI/UX design in a web application?",
    "What’s your favorite JavaScript library or framework?",
    "How do you keep your web apps secure from attacks?"
  ];

  return (
    <div style={{ width: "700px", margin: "20px auto", fontFamily: "Arial" }}>
      
      {/* Welcome Banner with animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }} // starts faded and higher
        animate={{ opacity: 1, y: 0 }}   // fades in and slides down
        transition={{ duration: 0.6 }}   // speed of animation
        style={{
          background: "linear-gradient(90deg, #041b2fff 0%, #00f2fe 100%)",
          color: "white",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          marginBottom: "25px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.2)"
        }}
      >
        <h2 style={{ margin: 0 }}>-- Discussion Board --</h2>
        <p style={{ fontSize: "18px", margin: "10px 0 0" }}>
          Welcome, <b>{username || "guest"}</b> 👋
        </p>
      </motion.div>

      {/* List of Posts */}
      {posts.map((text, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}             // each post starts faded
          animate={{ opacity: 1, y: 0 }}              // animates into view
          transition={{ duration: 0.5, delay: index * 0.1 }} // staggered timing
          className="card shadow-sm mb-3"
          style={{ borderRadius: "12px" }}
        >
          <div className="card-body">
            {/* Post title */}
            <h5 className="card-title">{text}</h5>
            {/* Like/Dislike functionality */}
            <Post text={text} user={username} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default DiscussionBoard;
