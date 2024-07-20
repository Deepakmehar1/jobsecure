import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchComponent from "./common/SearchComponent";
import "../styles/CandidateHomePage.css";

const CandidateHomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [user, setUser] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredReferrals, setFilteredReferrals] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeCard, setActiveCard] = useState("referral");

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
              <li key={referral.id}>
                <h3>{referral.title}</h3>
                <p>
                  {referral.company} - {referral.location}
                </p>
                <p>{referral.description}</p>
                <p>Referral ID: {referral.id}</p>
              </li>
              
            ))}
          </ul>
        </div>
        <div className={`card ${activeCard === "service" ? "show" : ""}`}>
          <h2>Candidate Services</h2>
          <ul>
            {filteredServices.map((service) => (
              <li key={service.id}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p>Service ID: {service.id}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
    </div>
  );
};

export default CandidateHomePage;
