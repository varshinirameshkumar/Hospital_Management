import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans">
        <Routes>
          
          <Route path="/" element={<Navigate to="/register" />} />
          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          
          <Route path="/doctor-dashboard" element={<div className="p-10 text-2xl">Doctor Dashboard Coming Soon!</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;