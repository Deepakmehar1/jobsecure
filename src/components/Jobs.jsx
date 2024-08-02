import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchComponent from "./common/SearchComponent"; // Adjust path as necessary
import "../styles/LoginPage.css"; // Adjust path as necessary

const JobsCard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/jobs.json"); // Adjust path as necessary
        setJobs(response.data);
        setFilteredJobs(response.data); // Initialize filteredJobs with all jobs
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleReferralRequest = (jobId) => {
    // Implement logic to request referral for jobId
    console.log(`Referral requested for job with ID: ${jobId}`);
    // Example: You can send a request to your backend or display a confirmation message
  };

  const handleServiceRequest = (serviceType) => {
    // Implement logic to request the selected service
    console.log(`Service requested: ${serviceType}`);
    // Example: You can send a request to your backend or trigger the service directly
  };

  const handleSearch = (searchTerm) => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
      <h1>Job Listings</h1>
      <ul className="list-j">
        {filteredJobs.map((job) => (
          <li key={job.id}>
            <h2>{job.title}</h2>
            <p>
              {job.company} - {job.location}
            </p>
            <p>{job.description}</p>
            <p>Salary: {job.salary}</p>
            <p className="post-date">Date Posted: {job.datePosted}</p>
            <div className="btns-container">
              <div className="btn-cvr">
                <button onClick={() => handleReferralRequest(job.id)}>
                  Request Referral
                </button>
              </div>
              <div className="btn-cvr">
                <button onClick={() => handleServiceRequest("resumeReview")}>
                  Request Resume Review
                </button>
              </div>
              <div className="btn-cvr">
                <button
                  onClick={() => handleServiceRequest("interviewHandhold")}
                >
                  Request Interview Handhold
                </button>
              </div>
              <div className="btn-cvr">
                <button onClick={() => handleServiceRequest("careerGuidance")}>
                  Request Career Guidance
                </button>
              </div>
              <div className="btn-cvr">
                <button onClick={() => handleServiceRequest("mockInterview")}>
                  Request Mock Interview
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobsCard;
