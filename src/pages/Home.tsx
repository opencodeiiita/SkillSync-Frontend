import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Home = ({isDarkMode,setIsDarkMode}) => {
  
  return (
    <div className="flex flex-col h-screen">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/> {/* Navbar */}
      <div className={`flex-grow flex items-center justify-center ${isDarkMode ? 'bg-gray-800 text-white':'bg-white text-black'}`}>
        <h1 className="text-4xl font-bold">Hello</h1>
      </div>
    </div>
  );
};

export default Home;