import React, { useEffect, useState } from 'react';
import './navbar.css';
import logo from '../../assets/acebook_log_white.png'
import isTokenValid from '../loggedin/LoggedInCheck';

const Navbar = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [tokenValid, setTokenValid] = useState(isTokenValid());

  // I asked chat-gpt for a function that checks if the token is valid every 5 seconds:
  // It uses isTokenValid from components/loggedin/LoggedInCheck.js
  useEffect(() => {
    // Function to check token validity and update state
    const checkTokenValidity = () => {
      const isValid = isTokenValid();
      setTokenValid(isValid);
    };

    // Initial check when the component mounts
    checkTokenValidity();

    // Check token validity every x seconds (adjust the interval as needed)
    const intervalId = setInterval(checkTokenValidity, 5000); // Check every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount


  const logout = () => {
    window.localStorage.removeItem("token")
  }




    if(token && tokenValid) {
      return (
        <div className="topnav">
          <a href='/timeline' className='image'> <img src={logo}alt="Logo" /></a>
          <a href='/new_post' className='txt'>Create a Post</a>
          <a href='/countdown' className='txt'>Token Timer</a>
          <a href='/profile' className='txt'> Profile Page</a>
          <a href='/' className='txt right' onClick={logout}>Log-Out</a>
        </div>
      );
    } else {
      return (
        <div class="topnav">
          <a href='/timeline' className='image'> <img src={logo}alt="Logo" /></a>
          <a href='/countdown' className='txt'>Token Timer</a>
          <a href='/login' className='txt right' >Log in</a>
        </div>
      )
    }}

export default Navbar;