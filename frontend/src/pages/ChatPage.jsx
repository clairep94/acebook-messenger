import React, { useEffect, useState } from 'react';
import isTokenValid from '../components/loggedin/LoggedInCheck';
import useTokenValidityCheck from '../components/loggedin/useTokenValidityCheck';

import Navbar from "../components/navbar/navbar";
import LoginPopup from "../components/auth/LoginPopup";
import Chats from '../components/chats/Chats';

//TODO lift states properly, must do on all pages.
// TODO handle re-route based on authentication in the App.js

const ChatPage = ({ navigate }) => {

  // ===== CHECK LOGGED IN STATUS TO RENDER PAGE: COPY TO EVERY AUTHENTICATED PAGE: ========== 
  const [isLoggedIn, setIsLoggedIn] = useState(null); // State to hold login status

  // Initial check on successful login -- prevents non-logged-in users from manually inputting this URL
  useEffect(() => {
    const tokenIsValid = isTokenValid();
    setIsLoggedIn(tokenIsValid); // Set the login status in the component state

    // Redirect to login page if the token is not valid
    if (tokenIsValid === false) {
      navigate('/');
    }
  }, [navigate]); // Include navigate in the dependency array to ensure the effect runs when navigate changes


  // ===== LOGIN POPUP & TIMEOUT CHECKER: COPY TO EVERY AUTHENTICATED PAGE: ========== 
  let showLoginPopup = !useTokenValidityCheck(); // checks every 5 seconds if token is valid and changes true/false
  const closeLoginPopup = () => {
    navigate('/');
  }

  // Conditionally render content based on isLoggedIn state
  return (
    <div>
      {isLoggedIn === true ? (
        <div>
          <Navbar/>
          <Chats/>

          {/* LOGIN POPUP -- COPY TO EVERY AUTHENTICATED PAGE */}
          {showLoginPopup && 
            <LoginPopup 
              navigate={navigate} 
              onClose={closeLoginPopup} 
            />
          }

        </div>
      ) 
      : (
    <></>
      )}
    </div>
  );
};


export default ChatPage;