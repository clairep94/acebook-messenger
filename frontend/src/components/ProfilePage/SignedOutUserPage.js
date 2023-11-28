import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import styles from './ProfilePage.css'
import defaultProfilePic from './profilePic/defaultProfilePic.png'
import CustomFeed from '../feed/customFeed';
import Feed from '../feed/Feed'
import LoginPopup from "../auth/LoginPopup";
import useTokenValidityCheck from '../loggedin/useTokenValidityCheck';
import getSessionUserID from '../utility/getSessionUserID';

import { TbFriends, TbFriendsOff } from "react-icons/tb";


const SignedOutUserPage = ({navigate}) => {
  const { userId } = useParams(); //ID of the profile page owner
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState(null); // State to hold user data

  const [profilePicture, setProfilePicture] = useState(null)

  let sessionUserID = getSessionUserID(token);
  const [friendRequested, setFriendRequested] = useState(false); //useState(user.requests.some(requester => requester._id === sessionUserID));
  const [areFriends, setAreFriends] = useState(true); //useState(user.friends.some(friend => friend._id === sessionUserID));


  // ===== LOGIN POPUP & TIMEOUT CHECKER: COPY TO EVERY AUTHENTICATED PAGE: ========== 
  let showLoginPopup = !useTokenValidityCheck(); // checks every 5 seconds if token is valid and changes true/false
  const closeLoginPopup = () => {
    navigate('/');
  }


  // ===== FRIEND REQUEST BUTTON ==============
  const handleFriendRequest = async (event) => {

    // PLACEHOLDER:
    // if (!friendRequested) {
    //   setFriendRequested(true)
    //   console.log(`Friend Requested!`)
    // } else {
    //   setFriendRequested(false)
    //   console.log(`Friend Cancelled!`)
    // }


    if (token) {
      event.preventDefault();

    // Step 1: PUT request for the session user to be added to this user's friend_requests
    fetch(`/userData/${user._id}/requests`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({})
    }) // complete Put request & update token
      .then(async response => {
        let putData = await response.json();
        console.log("token", putData)
        window.localStorage.setItem("token", putData.token);
        setToken(window.localStorage.getItem("token"));

        // Step 2: Perform the GET request to fetch the updated post
        return fetch(`/userData/${user._id}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      }) // Update user.requests to the data from the new GET request
      .then(getResponse => {
        if (!getResponse.ok) {
          throw new Error(`Failed to fetch updated user with ID ${user._id}`);
        }
        return getResponse.json();
      })
      .then(getData => {
        // Update the likes and userLiked state using the updated post data
        user.requests = getData.user.requests
        setFriendRequested(user.requests.some(requester => requester._id === sessionUserID));
      })
  }
}
      




  // ====== UNFRIEND BUTTON ========
  const handleUnfriend = () => {
    if (areFriends) {
      setAreFriends(false)
      console.log(`Unfriended`)
    } else {
      setAreFriends(true)
      console.log(`Reset unfriend button`)
    }
  }

  // ========= COMPONENT MOUNT ===============
  useEffect(() => {
    if (token) {

      if (sessionUserID === userId) {
        navigate('/profile');
      }
    
      // This ensures the user's ID is fetched dynamically from the URL
      fetch(`/userData/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(async userData => {
        window.localStorage.setItem("token", userData.token);
        setToken(window.localStorage.getItem("token"));
        console.log(userData.firstName)

        // Set user data obtained from the API response to the state
        setUser(userData.user);

        setProfilePicture(user.profilePictureURL) //TODO take out line, use .avatar

      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        // Handle errors, e.g., set an error state or display a message
      });
    }
  }, []); 


  // ============ JSX UI ========================
  return (
    <div>
      <Navbar/>

       {user && (
            <>
              <div className="wrap">
  
                {/* PROFILE PICTURE */}
                <div className="floatleft">
                  <div style={{ '--spacer-height': '60px' }} className="spacer"></div>
  
                  {/* TODO change to .avatar */}
                  {/* <img className="profilepic" src={user.avatar}></img> */}
                  {profilePicture ? (
                      <img src={profilePicture} alt="Profile" className='profilepic' />
                    ) : (
                      <img src={`https://picsum.photos/seed/${userId}/300`} alt="Profile" className='profilepic'/>
                    )}
                </div>


              {/* USER INFO */}
              <div className="floatright">
                <div style={{ '--spacer-height': '60px' }} className="spacer"></div>

                <h1 className='name'>{user.firstName} {user.lastName}</h1>
                <p><span style={{color:'#5B7EC2'}}><b>Email:</b></span><br/><span className='bio'>{user.email}</span></p>
                <p><span style={{color:'#5B7EC2'}}><b>Bio:</b></span><br/><span id="bio" className='bio'>{user.bio}</span></p>
                
                <div>
                  <button className={friendRequested ? 'friend-request-button-cancel' : "friend-request-button-add"} onClick={handleFriendRequest}>
                    {friendRequested ? "Cancel Request" : "Add Friend"}
                  </button>
                </div>

                <div>
                  <button className={areFriends ? 'unfriend-button' : ""} onClick={handleUnfriend}>
                  {areFriends ? "Unfriend" : " "}
                  </button>
                </div>

              </div>
              <div style={{ clear: 'both' }}></div>
            

              
              {/* USER POSTS */}

              <CustomFeed userId={user._id} firstName={user.firstName} lastName={user.lastName}/>

            </div>
        </>
        )}
        {/* LOGIN POPUP -- COPY TO EVERY AUTHENTICATED PAGE */}
        {showLoginPopup && 
            <LoginPopup 
              navigate={navigate} 
              onClose={closeLoginPopup} 
            />
          }
    </div>
  );
};

export default SignedOutUserPage;
