
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import './index.css';
// @ts-ignore
import Register from './pages/Register';


function App() {
  return (
    <Router>
      {/* Define routes in App.tsx */}
      <Routes>
        <Route path="/register" element={<Register />} />
        {/* You can add more routes here, like login, home, etc. */}
      </Routes>
    </Router>
  );
}
import React from "react";
import AppRouter from "./routes/AppRouter.tsx"; 

const App = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};


export default App;
