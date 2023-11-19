import React from 'react';
import Navbar from '../components/navbar/navbar';
import LogInForm from '../components/auth/LoginForm';
import '../pages/stylesheets/style.css';

const Welcome = ({ navigate }) => {
  // Fetch user-specific data based on userId and render content accordingly
  // Example: Fetch user details, posts, etc. using userId

  return (
    <>
      <Navbar />
      <div className="wrap">
        <div className="floatleft">
          <div style={{ '--spacer-height': '20px' }} className="spacer"></div>
          <p className='title'>WELCOME TO ACEBOOK</p>

          <p>Connecting Ace individuals from around the world since 2023...</p>
        </div>
        <div className="floatright">
          <div style={{ '--spacer-height': '100px' }} className="spacer"></div>
          <p className='subtitles'>Log in to start connecting</p>
          <LogInForm navigate={navigate}/>
          <p className='subtitles'>Don't have an account?</p>
          <button >Register</button>
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    </>
  );
};

export default Welcome;

