// src/Routes.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutUs from "./Components/AboutUs";
import ComponentMaker from "./Components/ComponentMaker";
import DareFinder from "./Components/DareFinder";
import Lander from "./Components/Lander";
import Login from "./Components/Login";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lander />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dare-finder" element={<DareFinder />} />
        <Route path="/component-maker" element={<ComponentMaker />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
