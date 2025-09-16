// importing Bootsrap CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';
// importing necessary modules from react-router-dom for routing
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//importing Signup and Login components for respective routes
import Signup from './Signup';
import Login from './Login';


//This is main app component which handles routing between Signup and Login components
function App() {
  return (

    //BrowserRouter is used to wrap the entire application to enable routing
    <BrowserRouter>
      <Routes>
        {/* Default route → redirect to /register */}
        <Route path="/" element={<Navigate to="/register" />} />
        
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

//Exporting app so it can be used in main.jsx
export default App;
