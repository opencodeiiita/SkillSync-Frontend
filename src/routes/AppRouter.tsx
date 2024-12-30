import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../components/Signin";
import WorkspaceDetailsPage from "../pages/WorkspaceDetailsPage";


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/workspace/:id" element={<WorkspaceDetailsPage/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
