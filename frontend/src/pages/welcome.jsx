import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import SignUpForm from '../components/user/SignUpForm';
import LoginPopup from '../components/auth/LoginPopup';
import '../pages/stylesheets/style.css';


const Welcome = ({ navigate }) => {
  // Fetch user-specific data based on userId and render content accordingly
  // Example: Fetch user details, posts, etc. using userId

  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);

  const handleLoginPopupClick = () => {
    setIsLoginPopupVisible(true);
  }

  const closeLoginPopup = () => {
    setIsLoginPopupVisible(false);
  }


  return (
    <>
      <Navbar />
      <div className="wrap">
        <div className="floatleft">
          <p className='title'>WELCOME TO ACEBOOK</p>

          <p>Connecting Ace individuals from around the world since 2023...</p>
        </div>
        <div className="floatright">
          <div style={{ '--spacer-height': '80px' }} className="spacer"></div>
          <p className='subtitles'>Register an account to start connecting</p>
          <SignUpForm navigate={navigate}/>
          <p className='subtitles'>Already Registered?</p>
          <button className='Button' onClick={ handleLoginPopupClick }>Login</button>
        </div>

        {/* LOGIN POPUP */}
        {isLoginPopupVisible && <LoginPopup navigate={navigate} onClose={closeLoginPopup} />}



        <div style={{ clear: 'both' }}></div>
      </div>
    </>
  );
};

export default Welcome;

