import React from 'react';  // Import the main React library so we can use JSX and its components
import ReactDOM from 'react-dom/client'; // Import ReactDOM to connect our React application into the DOM
import App from './App.jsx';// Import the main App component which is created in App.jsx

// creating root element and rendering the App component inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
