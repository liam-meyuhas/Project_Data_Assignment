import React from "react";
import { Link } from "react-router-dom";
import CsvTable from "./CsvTable ";
import Diagram from "./Diagram";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Home.css"; // Import the CSS file
import { FaTable, FaSitemap } from "react-icons/fa";

const Home = () => {
  return (
    <div>
      <BrowserRouter>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/csvtable" className="nav-link">
                <FaTable />
              </Link>
            </li>
            <h10 style={{ color: "white" }}>Wellcome To My WebSite!!!</h10>
            <li className="nav-item">
              <Link to="/diagram" className="nav-link">
                <FaSitemap />
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<CsvTable />} />
          <Route path="/csvtable" element={<CsvTable />} />
          <Route path="/diagram" element={<Diagram />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Home;
