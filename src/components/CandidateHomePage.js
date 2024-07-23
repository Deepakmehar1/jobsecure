import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import SearchComponent from "./common/SearchComponent";
import "../styles/CandidateHomePage.css";

const CandidateHomePage = () => {
  const [hoveredCard, setHoveredCard] = useState("default");
  const [currentRef, setCurrentRef] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredReferrals, setFilteredReferrals] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeCard, setActiveCard] = useState("referral");
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const referralsResponse = await axios.get("/referrals.json"); // Adjust the path as necessary
        const servicesResponse = await axios.get("/services.json"); // Adjust the path as necessary

        setReferrals(referralsResponse.data);
        setServices(servicesResponse.data);

        // Initialize filtered data with all data
        setFilteredReferrals(referralsResponse.data);
        setFilteredServices(servicesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const mousemove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", mousemove);
    return () => {
      window.addEventListener("mousemove", mousemove);
    };
  }, []);

  const handleSearch = (searchTerm) => {
    const filteredReferrals = referrals.filter((referral) =>
      referral.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredServices = services.filter((service) =>
      service.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredReferrals(filteredReferrals);
    setFilteredServices(filteredServices);
  };

  const handleShowCard = (card) => {
    setActiveCard(card);
  };

  const handleMouseOver = () => {
    setHoveredCard("inUl");
  };

  const handleMouseLeave = () => {
    setHoveredCard("default");
  };

  console.log(mousePosition);

   const handleCurrentIn = (item) => {
     setCurrentRef(item);
    
   };

   const handleCurrentLeave = () => {
     setCurrentRef(null);
   };
  const variants = {
    default: {
      scale: 0,
    },
    inUl: {
      scale:1,
    },
  };
  return (
    <div>
      {!localStorage.getItem("user") ? (window.location.href = "/login") : ""}

      <SearchComponent onSearch={handleSearch} />
      <motion.div
        className="cc"
        variants={variants}
        animate={hoveredCard}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      >
        {currentRef && (
          <>
            <p>
              {currentRef.company} - {currentRef.location}
            </p>
            <p>{currentRef.description}</p>
            <p>currentRef ID: {currentRef.id}</p>
          </>
        )}
      </motion.div>
      <div className="toggle-container">
        <div className="toggle-btn">
          <button
            className={activeCard === "referral" ? "active" : ""}
            onClick={() => handleShowCard("referral")}
          >
            Show Referrals
          </button>
          <button
            className={activeCard === "service" ? "active" : ""}
            onClick={() => handleShowCard("service")}
          >
            Show Services
          </button>
        </div>
        <div className={`card ${activeCard === "referral" ? "show" : ""}`}>
          <ul onMouseMove={handleMouseOver} onMouseLeave={handleMouseLeave}>
            {filteredReferrals.map((referral) => (
              <li
                id={referral.id}
                key={referral.id}
                onMouseOver={() => handleCurrentIn(referral)}
                onMouseLeave={handleCurrentLeave}
              >
                <h3>{referral.title}</h3>
                <h4>{referral.datePosted}</h4>
              </li>
            ))}
          </ul>
        </div>
        <div className={`card ${activeCard === "service" ? "show" : ""}`}>
          <ul>
            {filteredServices.map((service) => (
              <li
                id={service.id}
                key={service.id}
                onMouseOver={() => handleCurrentIn(service)}
                onMouseLeave={handleCurrentLeave}
              >
                <h3>{service.title}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CandidateHomePage;
