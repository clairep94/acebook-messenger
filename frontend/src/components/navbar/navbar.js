import React, { useEffect, useState } from 'react';
import './navbar.css';
import logo from '../../assets/acebook_log_white.png'
import useTokenValidityCheck from '../loggedin/useTokenValidityCheck';
import SearchBar from '../searchbar/SearchBar';
import { SearchResultsList } from '../searchbar/SearchResultsList';
import getSessionUserID from '../utility/getSessionUserID';
import useFetchUserDataByID from '../utility/getselectuserinfo';

const Navbar = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  // const [tokenValid, setTokenValid] = useState(isTokenValid());
  let tokenValid = useTokenValidityCheck(); // checks every 5 seconds if token is valid and changes true/false

  const logout = () => {
    window.localStorage.removeItem("token")
  }

  // get the session user's name for Profile Link
  const sessionUserID = getSessionUserID(token);
  const FoundUser = useFetchUserDataByID(sessionUserID);
  const friendRequests = FoundUser && FoundUser.requests.length ? true: false;
  const AuthorFirstName = FoundUser && FoundUser.firstName ? FoundUser.firstName : '';
  const AuthorLastName = FoundUser && FoundUser.lastName ? FoundUser.lastName : '';
  // const AuthorProfilePic = FoundUser && FoundUser.avatar ? FoundUser.avatar : '';
  // TODO change back to .avatar above
  const AuthorProfilePic = FoundUser && FoundUser.profilePictureURL ? FoundUser.profilePictureURL : '';


  // SEARCH BAR:
  const [results, setResults] = useState([]);

    if(token && tokenValid) {
      return (
        <div>
          <div className="topnav">
            <a href='/timeline' className='image'> <img src={logo}alt="Logo" /></a>
            
            {/* TODO change to .avatar */}
            {/* <a href='/profile' className='smallcirclemasknav'> <img src={AuthorProfilePic}alt="Logo" /></a> */}
            <a href='/profile'>
            {AuthorProfilePic ? (
                <img src={AuthorProfilePic} alt="Profile" className='smallcirclemasknav' />
              ) : (
                <img src={`https://picsum.photos/seed/${sessionUserID}/300`} alt="Profile" className='smallcirclemasknav'/>
              )}
            </a>

            <a href='/profile' className='navbarname'> {AuthorFirstName} {AuthorLastName}</a>
            <SearchBar setResults={setResults}/>

            <a href='/messages' className='navbar-messages'>
              Messages 
              {/* <span className={`friend-request-notification ${friendRequests ? 'condition-met': ''}`}></span>  */}
            </a>


            <a href='/your_friend_requests' className='navbar-friend-requests'>
              Friend Requests 
              <span className={`friend-request-notification ${friendRequests ? 'condition-met': ''}`}></span> 
            </a>

            <a href='/your_friends' className='navbar-friends'>Friends</a>

            <a href='/' className='txt right' onClick={logout}>Log-Out</a>
            
          </div>
          <div className="search-results">
            <SearchResultsList results={results}/>
          </div>
        </div>
      );
    } else {
      return (
        <div class="topnav">
          <a href='/timeline' className='image'> <img src={logo}alt="Logo" /></a>

            <SearchBar setResults={setResults}/>
          <a href='/login' className='txt right' >Log in</a>
        </div>
      )
    }}

export default Navbar;