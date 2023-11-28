import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import styles from './ProfilePage.css'
import UpdatePage from './updatePage';
import getSessionUserID from '../utility/getSessionUserID';
import CustomFeed from '../feed/customFeed';
import UpdateProfilePopUp from './UpdateProfilePopUp';

const ProfilePage = () =>{
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userData, setUserData] = useState(null)
  const [update, setUpdate] = useState(null)
  const [myId, setMyId] = useState('')

// POPUP INFORMATION HERE ---------------------------------
   // State for controlling the visibility of login and sign-up success pop-ups
   const [isUpdatePopupVisible, setUpdatePopupVisible] = useState(false); // Login pop-up visibility
    // Function to handle click event for displaying the login pop-up
    const handleUpdateProfileClick = () => {
      setUpdatePopupVisible(false); // Close the successful signup popup if visible
      setUpdatePopupVisible(true); // Set login pop-up visibility to true
    }
  
    // Function to close the login pop-up
    const closeLoginPopup = () => {
      setUpdatePopupVisible(false); // Set login pop-up visibility to false
    }
  // sends the fetch (get) request 
  useEffect(() => {
    // checks if signed in
    if (token) {
      const id = getSessionUserID(token)
      // get the userID
      setMyId(id)
      console.log(id)
      fetch(`/userData/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        }
      })
      // modified version of the feed code 
        .then((res) => res.json())
        .then( async data => {
          // the data returned is the user data and authetication token

          // the token is stored in the window
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          // and the user data is stored in the state 
          // you can access specific types of data using userData.atribute eg userData.email
          setUserData(data.user);

        })
        .catch((error) => {
          // console.error works like console.log but displays it as and error message
          console.error('Error fetching user data:', error);
          
        });
    }
  }, []);
  

  

  
  return (
    <>
      <div>
        <Navbar />
    
        {/* Profile information */}
        {userData && (
          <>
  
            <div className="wrap">

              {/* PROFILE PICTURE */}
              <div className="floatleft">
    
               {/* NEW USER.AVATAR */}
                <img src={userData.avatar} className='profilepic'/>
                  
             {/* ============= OLD USER.PROFILE PICTURE FIX ============== */}

              <div style={{ '--spacer-height': '60px' }} className="spacer"></div>

              {/* TODO change to .avatar */}
              {/* <img className="profilepic" src={userData.avatar}></img> */}
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className='profilepic' />
              ) : (
                <img src={`https://picsum.photos/seed/${userData._id}/300`} alt="Profile" className='profilepic'/>
              )}


            {/* USER INFO */}
            <div className="floatright">
              <div style={{ '--spacer-height': '60px' }} className="spacer"></div>

              <h1 className='name'>{userData.firstName} {userData.lastName}</h1>
              <p><span style={{color:'#5B7EC2'}}><b>Email:</b></span><br/><span className='bio'>{userData.email}</span></p>
              <p><span style={{color:'#5B7EC2'}}><b>Bio:</b></span><br/><span id="bio" className='bio'>{userData.bio}</span></p>

              <button className='UpdateButton'><a href='/updateprofile'>UpdatePage</a></button>

            </div>

            <div style={{ clear: 'both' }}></div>

          </div>
          <div>
              {/* Assuming myId is defined somewhere */}
              

              {/* USER POSTS */}

              <CustomFeed userId={myId} firstName={"your Page"} />
          </div>
          </>
        )}
      </div>
          {/* POPUP */}
        {/* Render the LoginPopup coSmponent conditionally based on isUpdatePopupVisible */}
        {isUpdatePopupVisible && 
          <UpdateProfilePopUp onClose={closeLoginPopup} />
        }
    </>
  );
        }  



export default ProfilePage


