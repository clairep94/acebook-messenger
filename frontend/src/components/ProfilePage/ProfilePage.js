import React, { useEffect, useState } from 'react';

import styles from './ProfilePage.css'

const ProfilePage = () =>{
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userData, setUserData] = useState(null)
  // sends the fetch (get) request 
  useEffect(() => {
    // checks if signed in
    if (token) {
      //goes to new route user data because it needs to check the token
      fetch("/userData", {
        headers: {
          'Authorization': `Bearer ${token}` 
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




  
    return( 
      <div>
      <h1>ProfilePage</h1>
     {/* hyper link to update page  */}

      <a href='/updateprofile' class="right" >UpdatePage</a>
      
      {/* This is conditonal, if you dont have this the page endlessly tries to render  */}
      {userData && (
              <div>
          <h2>your email: {userData.email}</h2>
        
          
          <h2>Your Bio:</h2>
          <span id="bio" className={styles.bio}>
          {userData.bio}
          </span>
          </div>

        )}
        
      </div>
      
  
    )
    
  }




export default ProfilePage