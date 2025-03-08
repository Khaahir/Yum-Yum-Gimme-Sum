import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useState and useEffect
import Menu from "../Pages/Menu";
import Eta from "../Pages/Eta";
import Bill from "../Pages/Bill";

function AppRoutes() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          {/* Pass apiKeys as a prop */}
          <Route path="eta" element={<Eta />} />
          <Route path="bill" element={<Bill />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRoutes;
