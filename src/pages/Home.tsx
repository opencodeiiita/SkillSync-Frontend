import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar /> {/* Navbar */}
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold">Hello</h1>
      </div>
    </div>
  );
};

export default Home;
