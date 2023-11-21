import React, { useEffect, useState } from 'react';
import './navbar.css';
import logo from '../../assets/acebook_log_white.png'
import useTokenValidityCheck from '../loggedin/useTokenValidityCheck';
import SearchBar from '../searchbar/SearchBar';
import { SearchResultsList } from '../searchbar/SearchResults';

const Navbar = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  // const [tokenValid, setTokenValid] = useState(isTokenValid());
  let tokenValid = useTokenValidityCheck(); // checks every 5 seconds if token is valid and changes true/false

  const logout = () => {
    window.localStorage.removeItem("token")
  }

  // SEARCH BAR:
  const [results, setResults] = useState([]);

    if(token && tokenValid) {
      return (
        <div className="topnav">
          <a href='/timeline' className='image'> <img src={logo}alt="Logo" /></a>
          <a href='/new_post' className='txt'>Create a Post</a>
          <a href='/countdown' className='txt'>Token Timer</a>
          <a href='/profile' className='txt'> Profile Page</a>
          <SearchBar setResults={setResults}/>
          <SearchResultsList results={results}/>
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