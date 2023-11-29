import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar/navbar";
import YourFriendsList from '../components/friends-list/YourFriendsList';
import getSessionUserID from '../components/utility/getSessionUserID';

import useTokenValidityCheck from '../components/loggedin/useTokenValidityCheck';
import LoginPopup from "../components/auth/LoginPopup";




const YourFriendsListPage = ({navigate}) => {

    // ===== LOGIN POPUP & TIMEOUT CHECKER: COPY TO EVERY AUTHENTICATED PAGE: ========== 
    let showLoginPopup = !useTokenValidityCheck(); // checks every 5 seconds if token is valid and changes true/false
    const closeLoginPopup = () => {
        navigate('/');
    }


    return (
        <>
        <Navbar />
        <p className='subtitles' id='your-friends-title'>YOUR FRIENDS</p>
        <YourFriendsList />
        
        {/* LOGIN POPUP -- COPY TO EVERY AUTHENTICATED PAGE */}
        {showLoginPopup && 
            <LoginPopup 
              navigate={navigate} 
              onClose={closeLoginPopup} 
            />
          }
        
        </>
        
    )
}

export default YourFriendsListPage;