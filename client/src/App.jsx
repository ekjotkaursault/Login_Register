// Import Bootstrap for styling
import 'bootstrap/dist/css/bootstrap.min.css';
// Import routing tools from React Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import our components (pages)
import Signup from "./Signup";
import Login from "./Login";
import DiscussionBoard from "./DiscussionBoard"; // ✅ import it

function App() {
  return (

    // BrowserRouter enables routing inside our React app
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} /> {/* If someone opens the base URL "/", send them to /register */}
        <Route path="/register" element={<Signup />} />  {/* Signup page */}
        <Route path="/login" element={<Login />} />    {/* Login page */}
        
         {/* Discussion board page */}
        <Route path="/board" element={<DiscussionBoard />} />   {/* ✅ new route */}
      </Routes>
    </BrowserRouter>
  );
}

// Export App so it can be used in index.js
export default App;
