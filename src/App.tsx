import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import './index.css';
import { useEffect,useState } from 'react';
// import Register from './pages/Register.tsx';
import Home from './pages/Home.tsx'; // Import the Home component
// import Profile from './pages/Profile.tsx'; // Add Profile Page route
// import Settings from './pages/Settings.tsx'; // Add Settings Page route

const App = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDarkMode(theme === 'dark');
  }, []);

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);


  return (
    <Router>
      <div className="App">
        {/* Main routes defined here */}
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
