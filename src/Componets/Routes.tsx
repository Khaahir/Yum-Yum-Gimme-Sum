import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "../Pages/Menu";
import Order from "../Pages/Order";
import Eta from "../Pages/Eta";
import Bill from "../Pages/Bill";

function AppRoutes() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="eta" element={<Eta />} />
          <Route path="bill" element={<Bill />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRoutes;
