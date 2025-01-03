// src/Routes.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ComponentMaker from "./Components/ComponentMaker";
import DareFinder from "./Components/DareFinder";
import Login from "./Components/Login";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dare-finder" element={<DareFinder />} />
        <Route path="/component-maker" element={<ComponentMaker />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
