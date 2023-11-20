import React from 'react';
import Navbar from '../components/navbar/navbar';
import SignUpForm from '../components/user/SignUpForm';
import '../pages/stylesheets/style.css';

const Welcome = ({ navigate }) => {
  // Fetch user-specific data based on userId and render content accordingly
  // Example: Fetch user details, posts, etc. using userId

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
          <a href='/login'><button className='Button'>Login</button></a>
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    </>
  );
};

export default Welcome;

