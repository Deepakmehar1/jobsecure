// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./components/IndexPage";
import LoginPage from "./components/LoginPage";
import ListCard from "./components/common/ListCard";
import JobsCard from "./components/Jobs";
import SideBar from "./components/common/SideBar";
import CandidateHomePage from "./components/CandidateHomePage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <SideBar />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/lists" element={<ListCard />} />
        <Route path="/jobs" element={<JobsCard />} />
        <Route path="/candidate/home" element={<CandidateHomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
