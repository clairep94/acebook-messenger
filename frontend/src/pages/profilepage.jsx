
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';

const UserProfile = () => {
  const { userId } = useParams(); // Get the userId from the URL parameter

  // Fetch user-specific data based on userId and render content accordingly
  // Example: Fetch user details, posts, etc. using userId

  return (
    <div>
    <Navbar/>
      <h1>User Page for ID: {userId}</h1>
        Should Show Profile Information if ID is in system.
        <br/>
        If not then should have a User Not Found Message 
    </div>
  );
};

export default UserProfile;
