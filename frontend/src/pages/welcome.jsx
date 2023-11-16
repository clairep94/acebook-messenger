import React from 'react';
import Navbar from '../components/navbar/navbar';
import SignUpForm from '../components/user/SignUpForm';
const Welcome = ({navigate}) => {


  // Fetch user-specific data based on userId and render content accordingly
  // Example: Fetch user details, posts, etc. using userId

  return (
    <div>
    <Navbar/>
      <h1>Welcome to Acebook</h1>
      <SignUpForm navigate={navigate}/>
      {/* Render user-specific content */}
      {/* You can fetch user data and display it here */}
    </div>
  );
};

export default Welcome;
