import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import styles from './ProfilePage.css'
import defaultProfilePic from './profilePic/defaultProfilePic.png'
import UpdatePage from './updatePage';
import getSessionUserID from '../utility/getSessionUserID';
const ProfilePage = () =>{
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userData, setUserData] = useState(null)
  const [update, setUpdate] = useState(null)
  
  // sends the fetch (get) request 
  useEffect(() => {
    // checks if signed in
    if (token) {
      const id = getSessionUserID(token)
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

        {/* TODO - style this -- Hyperlink to update page */}
        <a href='/updateprofile' className="right">UpdatePage</a>
        {/* TODO -- this image is just a place holder, we'll need to do some conditional rendering 
        so that it only displays if no ones uploaded a picture  */}
        {/* <img className="profilepic" src={(userData.profilePictureURL) ? defaultProfilePic : userData.profilePictureURL}></img> */}
        {/* <img className="profilepic" src={defaultProfilePic}></img> */}
        <img className="profilepic" src={defaultProfilePic}></img>

        {/* Profile information */}
        {userData && (
          <>
            <div>
               {/* modified to dispaly the email as display name if there is no display name */}
              {/* <h1>{name}'s ProfilePage</h1> */}
              <h1>{userData.firstName} {userData.lastName}</h1>
              <h3>{userData.firstName}'s Email: {userData.email}</h3>
              <h3>{userData.firstName}'s Bio: <span id="bio" className={styles.bio}>{userData.bio}</span></h3>




             
            </div>
          </>
        )}

        {/* Update page link again */}
        
      </div>
    </>
  );
};



export default ProfilePage