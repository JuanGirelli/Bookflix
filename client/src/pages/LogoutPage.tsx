import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate logout by clearing local storage or session data
    localStorage.clear(); // Clear user session or token data
    alert("You have been logged out successfully!"); // Show alert to the user
    navigate("/"); // Redirect to the login page after a brief delay
  }, [navigate]);

  return (
    <div>
      <h2>Logged Out Successfully!</h2>
      <p>Redirecting to login...</p>
    </div>
  );
};


export default LogoutPage;
