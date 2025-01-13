<<<<<<< HEAD
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from "./pages/Home.tsx";
import Workspace from "./components/Workspace.tsx";
=======
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import './index.css';
import ExploreMeetingPage from './pages/ExploreMeetingPage.tsx';
import Home from './pages/Home.tsx';
import Workspace from './components/Workspace.tsx';
import WorkspaceDetailsPage from './pages/WorkspaceDetailsPage';
import NotificationPage from './pages/NotificationPage.tsx';
>>>>>>> 5cbd3bc (add meeting page)

import WorkspaceDetailsPage from "./pages/WorkspaceDetailsPage";
import NotificationPage from "./pages/NotificationPage.tsx";

import UserProfilePage from "./pages/UserProfilePage.tsx";
import WorkspacesPage from "./pages/WorkspacesPage.tsx";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setIsDarkMode(theme === "dark");
  }, []);

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <Router>
      <div className="App">
        <Routes>
<<<<<<< HEAD
          <Route
            path="/"
            element={
              <Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            }
          />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/workspaces" element={<WorkspacesPage />} />
          <Route path="/user" element={<UserProfilePage />} />
          <Route path="/workspace/:id" element={<WorkspaceDetailsPage />} />
=======
          <Route path="/" element={<Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
         <Route path='/notification' element={<NotificationPage/>}/>
          <Route path="/workspace" element={<Workspace  />} />
          <Route path="/workspace/:id" element={<WorkspaceDetailsPage  />} />
>>>>>>> 5cbd3bc (add meeting page)
        </Routes>
      </div>
    </Router>
  );
};

export default App;
