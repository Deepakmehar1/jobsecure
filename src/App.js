// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ListCard from "./components/common/ListCard";
import SideBar from "./components/common/SideBar";
import CandidateHomePage from "./components/CandidateHomePage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <SideBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobs" element={<ListCard />} />
        <Route path="/candidate/home" element={<CandidateHomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
