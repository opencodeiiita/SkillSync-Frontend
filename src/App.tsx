import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import './index.css';
import Home from './pages/Home.tsx';
import Profile from './pages/Profile.jsx';
import Workspace from './components/Workspace.tsx';


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
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
    
          <Route path="/workspace" element={<Workspace  />} />
          <Route path="/profile" element={<Profile  />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
