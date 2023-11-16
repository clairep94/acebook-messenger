import React, { useEffect, useState } from 'react';
import isTokenValid from '../loggedin/LoggedInCheck';

const TestingPlace = ({ navigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // State to hold login status

  useEffect(() => {
    const tokenIsValid = isTokenValid();
    setIsLoggedIn(tokenIsValid); // Set the login status in the component state

    // Perform navigation when isLoggedIn changes
    if (tokenIsValid === false) {
      navigate('/welcome');
    }
  }, [navigate]); // Include navigate in the dependency array to ensure the effect runs when navigate changes

  // Conditionally render content based on isLoggedIn state
  return (
    <div>
      {isLoggedIn === true ? (
        <div> Logged in!</div>
      ) : (
        <div>This Code Will render when the Token is neither True or False - If you're seeing this on page this is a bug</div>
      )}
    </div>
  );
};

export default TestingPlace;