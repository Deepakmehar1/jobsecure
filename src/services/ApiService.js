// src/services/ApiService.js
import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Adjust the port if your backend is running on a different port

const ApiService = {
  getReferrals: () => {
    return axios
      .get(`${BASE_URL}/api/referrals`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error fetching the referrals!", error);
        throw error;
      });
  },

  getServices: () => {
    return axios
      .get(`${BASE_URL}/api/services`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error fetching the services!", error);
        throw error;
      });
  },

  login: (credentials) => {
    return axios
      .post(`${BASE_URL}/api/login`, credentials)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error during the login process!", error);
        throw error;
      });
  },
};

export default ApiService;
