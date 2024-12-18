import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../components/Signin";


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
       
      </Routes>
    </Router>
  );
};

export default AppRouter;
