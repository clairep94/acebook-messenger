import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import styles from './ProfilePage.css'
import defaultProfilePic from './profilePic/defaultProfilePic.png'
import CustomFeed from '../feed/customFeed';
import Feed from '../feed/Feed'

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const SignedOutUserPage = ({navigate}) => {
  const { userId } = useParams();
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState(null); // State to hold user data
  let fillerImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png'
  let profilePicture= fillerImage
  
 



  useEffect(() => {
    if (token) {
    
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
       
        
        const decodedToken = parseJwt(token);
        const uId = decodedToken ? decodedToken.user_id : null;
        console.log('the token id', uId)

        if(userData.user._id === uId){
          
          navigate('/profile');
        }
        
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        // Handle errors, e.g., set an error state or display a message
      });
    }
  }, []); // Include token and userId in the dependency array

  return (
    <div>
      <Navbar/>
     
      {user && (
          <>
            <div className="wrap">
              <div className="floatleft">
                <img src={profilePicture} className='profilepic'/>
              </div>
              <div className="floatright">
                <h1 className='name'>{user.firstName} {user.lastName}</h1>
                <p><span style={{color:'#5B7EC2'}}>Email:</span><br/>{user.email}</p>
                <p><span style={{color:'#5B7EC2'}}>Bio:</span><br/><span id="bio" className={styles.bio}>{user.bio}</span></p>
              </div>
              <div style={{ clear: 'both' }}></div>
            
              <CustomFeed userId={userId} firstName={user.firstName} lastName={user.lastName}/>
            </div>
          </>
        )}

    </div>
  );
};

export default SignedOutUserPage;