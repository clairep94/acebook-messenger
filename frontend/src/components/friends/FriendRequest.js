import React, { useState, useEffect } from 'react';
import getSessionUserID from '../utility/getSessionUserID';

const FriendRequestButton = ({ user }) => {
  // =========== STATE VARIABLES ==========================
  const [targetUser, setTargetUser] = useState(user); // State to hold user data
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  let sessionUserID = getSessionUserID(token);
  const [friendRequested, setFriendRequested] = useState(targetUser.requests.some(requester => requester._id === sessionUserID));


    const forceUpdate = React.useReducer(() => ({}), {})[1];


    useEffect(() => {
        // This effect will run when friendRequested changes
        console.log('friendRequested has changed:', friendRequested);
        // You can add any logic here that you want to execute when friendRequested changes
        forceUpdate(); // Force a re-render of the component
      }, [friendRequested]);

    const handleFriendRequest = async (event) => {

        if (token) {
        event.preventDefault();

        // Step 1: PUT request for the session user to be added to this user's friend_requests
        let putEndpoint = `/userData/${targetUser._id}/requests/`
        if (friendRequested){
            putEndpoint += 'delete' //UsersController.DeleteFriendRequest if session user has already sent a friend request to the profile owner
        } else {
            putEndpoint += 'new' //UsersController.SendFriendRequest if session user has not sent a request yet.
        }

        fetch(putEndpoint, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({})
        }) // complete Put request & update token
        .then(async response => {
            let putData = await response.json();
            console.log("token", putData)
            window.localStorage.setItem("token", putData.token);
            setToken(window.localStorage.getItem("token"));

            // Step 2: Perform the GET request to fetch the updated post
            return fetch(`/userData/${targetUser._id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            });
        }) // Update user.requests to the data from the new GET request
        .then(getResponse => {
            if (!getResponse.ok) {
            throw new Error(`Failed to fetch updated user with ID ${targetUser._id}`);
            }
            return getResponse.json();
        })
        .then(getData => {
            // Update the likes and userLiked state using the updated post data
            // targetUser.requests = getData.user.requests
            setTargetUser(getData.user)
            setFriendRequested(targetUser.requests.some(requester => requester._id === sessionUserID));
        })
    }}


      // ============ JSX UI ========================
    return (
        <div>
        <button className={friendRequested ? 'friend-request-button-cancel' : "friend-request-button-add"} onClick={handleFriendRequest}>
            {friendRequested ? "Cancel Request" : "Add Friend"}
        </button>
        </div>
        )


}

export default FriendRequestButton;