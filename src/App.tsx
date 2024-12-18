import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import './index.css';
// import Register from './pages/Register.tsx';
import Home from './pages/Home.tsx'; // Import the Home component
// import Profile from './pages/Profile.tsx'; // Add Profile Page route
// import Settings from './pages/Settings.tsx'; // Add Settings Page route

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Main routes defined here */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
