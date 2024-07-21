import React, { useState } from "react";
import "../../styles/LoginPage.css"

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm.trim());
  };

  return (
    <div
      className="search-container"
    >
      
      <input
        className="search-input"
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>
        <i class="fi fi-rs-search"></i>
      </button>
    </div>
  );
};

export default SearchComponent;
