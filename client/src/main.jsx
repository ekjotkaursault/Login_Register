// Import React core library
import React from "react";
// Import ReactDOM to render our app into the HTML page
import ReactDOM from "react-dom/client";
// Import the main App component
import App from "./App.jsx";

// Render the App component inside the div with id="root" in index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* StrictMode helps catch errors and enforces best practices */}
    <App />
  </React.StrictMode>
);

