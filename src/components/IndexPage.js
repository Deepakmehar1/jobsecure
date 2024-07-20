// src/components/IndexPage.js
import React from "react";
import { Link } from "react-router-dom";
import SearchComponent from "./common/SearchComponent";

const IndexPage = () => {
  return (
    <div className="container">
      <h1>Welcome to Worko</h1>
      <SearchComponent onSearch={(term) => console.log("Search term:", term)} />
      <Link to="/login">
        <button className="btn btn-primary mt-3">Login</button>
      </Link>
    </div>
  );
};

export default IndexPage;
