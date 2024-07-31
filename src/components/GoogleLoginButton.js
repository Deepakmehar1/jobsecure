import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
const clientId = process.env.REACT_APP_CLIENT_ID;
    
const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    const decodedToken = jwtDecode(response.credential);
    console.log("Decoded Token:", decodedToken);

    // Extract user info
    const { name, email, picture } = decodedToken;
    console.log("User Info:", { name, email, picture });

    // Store user info in localStorage or state management
    localStorage.setItem("user", JSON.stringify({ name, email, picture }));
    navigate("/candidate/home"); // Redirect to candidate home page
    window.location.reload()
  };

  const handleLoginFailure = (response) => {
    console.error("Login Failed:", response);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        buttonText="Login with Google"
        cookiePolicy={"single_host_origin"}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
