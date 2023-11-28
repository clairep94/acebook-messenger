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


      {user && (
          <>
            <div className="wrap">
              <div className="floatleft">
              <div style={{ '--spacer-height': '60px' }} className="spacer"></div>


            {/* NEW USER.AVATAR */}
            <img src={user.avatar} className='profilepic'/>
              
              
             {/* ============= OLD USER.PROFILE PICTURE FIX ============== */}
              {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className='profilepic' />
                ) : (
                  <img src={`https://picsum.photos/seed/${userId}/300`} alt="Profile" className='profilepic'/>
                )}
              </div>
              {/* ============= END OLD USER.PROFILE PICTURE FIX ============== */}


              <div className="floatright">
              <div style={{ '--spacer-height': '60px' }} className="spacer"></div>

                <h1 className='name'>{user.firstName} {user.lastName}</h1>
                <p><span style={{color:'#5B7EC2'}}><b>Email:</b></span><br/><span className='bio'>{user.email}</span></p>
                <p><span style={{color:'#5B7EC2'}}><b>Bio:</b></span><br/><span id="bio" className='bio'>{user.bio}</span></p>
              </div>
              <div style={{ clear: 'both' }}></div>
            
              <CustomFeed userId={userId} firstName={user.firstName} lastName={user.lastName}/>

            </div>
            <div className="floatright">
            <div style={{ '--spacer-height': '60px' }} className="spacer"></div>
              <h1 className='name'>{user.firstName} {user.lastName}</h1>
              <p><span style={{color:'#5B7EC2'}}><b>Email:</b></span><br/><span className='bio'>{user.email}</span></p>
              <p><span style={{color:'#5B7EC2'}}><b>Bio:</b></span><br/><span id="bio" className='bio'>{user.bio}</span></p>
            </div>
            <div style={{ clear: 'both' }}></div>
          </div>
          <div>
            {/* Assuming myId is defined somewhere */}
            
            <CustomFeed userId={user._id} firstName={`Posts by ${user.firstName}`} />
          </div>
        </>
        )}

    </div>
  );
};

export default SignedOutUserPage;