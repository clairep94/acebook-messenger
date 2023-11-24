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
      <img className="profilepic" src={defaultProfilePic}></img>
      {user && (
          <>
            <div>
               {/* modified to dispaly the email as display name if there is no display name */}
              <h1>{user.firstName} {user.lastName}</h1>
              <h3>{user.firstName}'s Email: {user.email}</h3>
              <h3>{user.firstName}'s Bio: <span id="bio" className={styles.bio}>{user.bio}</span></h3>
              
              <span id="bio" className={styles.bio}>
                {user.bio}
              </span>
              <CustomFeed userId={userId} firstName={user.firstName} lastName={user.lastName}/>
            </div>
          </>
        )}

    </div>
  );
};

export default SignedOutUserPage;