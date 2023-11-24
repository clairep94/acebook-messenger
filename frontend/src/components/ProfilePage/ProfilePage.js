import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import styles from './ProfilePage.css'
import UpdatePage from './updatePage';
import getSessionUserID from '../utility/getSessionUserID';
import CustomFeed from '../feed/customFeed';

const ProfilePage = () =>{
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userData, setUserData] = useState(null)
  const [update, setUpdate] = useState(null)

 let fillerImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png'
let profilePicture= fillerImage


  const [myId, setMyId] = useState('')
  

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
        {/* TODO -- this image is just a placeholder, we'll need to do some conditional rendering 
            so that it only displays if no one has uploaded a picture  */}
        {/* <img className="profilepic" src={(userData.profilePictureURL) ? defaultProfilePic : userData.profilePictureURL}></img> */}
        {/* <img className="profilepic" src={defaultProfilePic}></img> */}
  
        {/* Profile information */}
        {userData && (
          <>  
            <div className="wrap">
              <div className="floatleft">
                <img src={userData.avatar} className='profilepic'/>
              </div>
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
              <CustomFeed userId={myId} firstName={"your Page"} />
            </div>
          </>
        )}
      </div>
    </>
  );
        }  



export default ProfilePage


