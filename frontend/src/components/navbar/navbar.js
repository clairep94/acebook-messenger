import React, { useEffect, useState } from 'react';
import './navbar.css';
import {validateToken} from '../countdown/countdown';

const Navbar = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleTokenValidation = () => {
    validateToken(token, setToken);
  };
  
  const logout = () => {
    window.localStorage.removeItem("token")
  }

  
    if(token) {
      return(
        <div class="topnav">
        <a href='/'>Home</a>
        <a href='/posts'>Feed</a>
        <a href='/new_post'>Create a Post</a>
        <a href='/countdown'> Token Timer</a>
        <a href='/' class="right" onClick={logout}>Log-Out</a>
        <button onClick={handleTokenValidation}>Refresh Token</button>
        
        </div>
      )
    } else {
      return (
        <div class="topnav">
        <a href='/'>HomePage</a>
        <a href='/posts'>Feed</a>
        <a href='/new_post'>Create a Post</a>
        <a href='/countdown'> Token Timer</a>
        <a href='/login' class="right" >Login</a>
        </div>
      )
    }}

export default Navbar;