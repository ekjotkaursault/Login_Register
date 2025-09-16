import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

function App() {
  return (
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

export default App;
