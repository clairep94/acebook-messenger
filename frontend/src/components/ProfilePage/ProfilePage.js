import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import styles from './ProfilePage.css'
import defaultProfilePic from './profilePic/defaultProfilePic.png'

const ProfilePage = () =>{
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userData, setUserData] = useState(null)
  const [name, setName] = useState(null)
 
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
          
            
          setName(data.user.email)
          console.log(name)
          if(data.user.displayName){
            setName(data.user.displayName)
          }
          
         
          
          
          


          
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

        {/* Hyperlink to update page */}
        <a href='/updateprofile' className="right">UpdatePage</a>
        {/* this image is just a place holder, we'll need to do some conditional rendering 
        so that it only displays if no ones uploaded a picture  */}
        <img className="profilepic" src={defaultProfilePic}></img>
        {/* Profile information */}
        {userData && (
          <>
            <div>
               {/* modified to dispaly the email as display name if there is no display name */}
              <h1>{name}'s ProfilePage</h1>
              <h3>Your email: {userData.email}</h3>
              <h3>Your Bio:</h3>
              <span id="bio" className={styles.bio}>
                {userData.bio}
              </span>
            </div>
          </>
        )}

        {/* Update page link again */}
        
      </div>
    </>
  );
};



export default ProfilePage