import React, { useEffect, useState } from 'react';
import isTokenValid from '../components/loggedin/LoggedInCheck';

import Navbar from "../components/navbar/navbar";
import Feed from "../components/feed/Feed";
import NewPostForm from "../components/post_create/NewPostForm";

const Index = ({ navigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // State to hold login status

  useEffect(() => {
    const tokenIsValid = isTokenValid();
    setIsLoggedIn(tokenIsValid); // Set the login status in the component state

    // Perform navigation when isLoggedIn changes
    if (tokenIsValid === false) {
      navigate('/');
    }
  }, [navigate]); // Include navigate in the dependency array to ensure the effect runs when navigate changes

  // Conditionally render content based on isLoggedIn state
  return (
    <div>
      {isLoggedIn === true ? (
            <div>
            <Navbar/>
          <p>Welcome to AceBook</p>
          <NewPostForm navigate={navigate}/>
          <Feed/>
        </div>
      ) 
      : (
        <div>This Code Will render when the Token is neither True or False - If you're seeing this on page this is a bug</div>
      )}
    </div>
  );
};


export default Index;