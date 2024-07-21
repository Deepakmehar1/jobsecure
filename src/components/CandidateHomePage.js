import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import SearchComponent from "./common/SearchComponent";
import "../styles/CandidateHomePage.css";

const CandidateHomePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredReferrals, setFilteredReferrals] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeCard, setActiveCard] = useState("referral");
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const cardContentRef = useRef(null);
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

  const mousemove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

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

  const handleMouseOver = (item) => {
    setHoveredCard(item);
    var id = document.querySelector("#" + item.id);

    id.addEventListener("mousemove", mousemove);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const cardContentStyles = {
    left: `${
      mousePosition.x - (cardContentRef.current?.offsetWidth || 0) / 1.5
    }px`,
    top: `${
      mousePosition.y - (cardContentRef.current?.offsetHeight || 0) / 4
    }px`,
  };
  const variants = {
    default: {
      scale: [1, 2, 2, 1, 1],
    },
  };
  return (
    <div>
      {!localStorage.getItem("user") ? (window.location.href = "/login") : ""}

      <SearchComponent onSearch={handleSearch} />
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
          <h2>Candidate Referrals</h2>
          <ul>
            {filteredReferrals.map((referral) => (
              <li
                id={referral.id}
                key={referral.id}
                onMouseOver={() => handleMouseOver(referral)}
                onMouseLeave={handleMouseLeave}
              >
                <h3>{referral.title}</h3>
                {hoveredCard && hoveredCard.title === referral.title && (
                  <motion.div
                    className="card-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      position: "fixed",
                      pointerEvents: "none",
                      left: cardContentStyles.left,
                      top: cardContentStyles.top,
                    }}
                    ref={cardContentRef}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <p>
                      {referral.company} - {referral.location}
                    </p>
                    <p>{referral.description}</p>
                    <p>Referral ID: {referral.id}</p>
                  </motion.div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={`card ${activeCard === "service" ? "show" : ""}`}>
          <h2>Candidate Services</h2>
          <ul>
            {filteredServices.map((service) => (
              <li
                id={service.id}
                key={service.id}
                onMouseOver={() => handleMouseOver(service)}
                onMouseLeave={handleMouseLeave}
              >
                <h3>{service.title}</h3>
                {hoveredCard && hoveredCard.title === service.title && (
                  <motion.div
                    className="card-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      position: "fixed",
                      pointerEvents: "none",
                      left: cardContentStyles.left,
                      top: cardContentStyles.top,
                    }}
                    ref={cardContentRef}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <p>{service.description}</p>
                    <p>Service ID: {service.id}</p>
                  </motion.div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CandidateHomePage;
