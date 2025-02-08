// src/Routes.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ComponentMaker from "./Components/ComponentMaker";
import AboutUs from "./pages/AboutUs";
import DareCarousel from "./pages/DareCarousel";
import Lander from "./pages/Lander";
import Login from "./pages/Login";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lander />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dare-finder" element={<DareCarousel />} />
        <Route path="/component-maker" element={<ComponentMaker />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
