import React, { useState } from "react";

// Post component represents a single discussion item
// Each post can be liked or disliked by the user

function Post({ text, user }) {
   // Local state: track the count (likes/dislikes) and the user’s choice 
  const [count, setCount] = useState(0);
  const [choice, setChoice] = useState("");

  // Handle when the user clicks like/dislike
  const handleChange = (event) => {
    const value = event.target.value;

    // If switching from like - dislike, subtract 2
    if (choice === "like" && value === "dislike") {
      setCount(count - 2);

      // If switching from dislike → like, add 2
    } else if (choice === "dislike" && value === "like") {
      setCount(count + 2);

      // If first time clicking like, add 1
    } else if (choice === "" && value === "like") {
      setCount(count + 1);

       // If first time clicking dislike, subtract 1
    } else if (choice === "" && value === "dislike") {
      setCount(count - 1);
    }

     // Update the user’s choice

    setChoice(value);
  };

  return (
    <div
      style={{
        margin: "10px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#adebf3ff",
      }}
    >
      <p>{text}</p>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* 👍 Like option */}
        <label>
          <input
            type="radio"
            name={`vote-${text}`}
            value="like"
            checked={choice === "like"}
            onChange={handleChange}
          />{" "}
          👍 Like
        </label>

        {/* Count */}
        <span
          style={{
            fontWeight: "bold",
            color: count > 0 ? "green" : count < 0 ? "red" : "black",
          }}
        >
          {count > 0 ? `+${count}` : count}
        </span>

        {/* 👎 Dislike option */}
        <label>
          <input
            type="radio"
            name={`vote-${text}`}
            value="dislike"
            checked={choice === "dislike"}
            onChange={handleChange}
          />{" "}
          👎 Dislike
        </label>
      </div>

      {/* ✅ Show who reacted */}
      <div style={{ marginTop: "5px", fontSize: "0.9em", color: "#555" }}>
        {choice === "like" && `${user} liked this 👍`}
        {choice === "dislike" && `${user} disliked this 👎`}
      </div>
    </div>
  );
}

export default Post;
