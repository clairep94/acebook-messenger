import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';

const UserProfile = () => {
  const { userId } = useParams();
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState(null); // State to hold user data


  // The Below is included from a failed experiment and remains only
  // on the offchance it may be useful to somebody - Feel free to delete


  useEffect(() => {
    if (token) {
      // This ensures the user's ID is fetched dynamically from the URL
      fetch(`/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(async userData => {
        window.localStorage.setItem("token", userData.token);
        setToken(window.localStorage.getItem("token"));

        // Set user data obtained from the API response to the state
        setUser(userData);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        // Handle errors, e.g., set an error state or display a message
      });
    }
  }, [token, userId]); // Include token and userId in the dependency array

  return (
    <div>
      <Navbar />
      <h1>User Page for ID: {userId}</h1>
      
      {user ? (
        <div>
          {/* Display user profile information */}
          <p>User Email: {user.email}</p>
          <p>User Password: {user.password}</p>
          {/* Add other user details */}
        </div>
      ) : (
        <p>This text is displayed because an instance of user cannot be found</p>
      )}

    </div>
  );
};

export default UserProfile;

