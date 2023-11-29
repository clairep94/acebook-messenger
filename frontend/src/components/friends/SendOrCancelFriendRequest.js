import React, { useState, useEffect } from 'react';
import getSessionUserID from '../utility/getSessionUserID';

const FriendRequestButton = ({ user }) => {

    // This button checks if the sessionUser has sent a friend request to the target.
    // If yes, the session user can cancel their request
    // If no, the session user can make a friend request
    // This button takes targetUser data on first render for the friendRequested state, and manually updates friendRequested state (see line 68-70)
        // friendRequested state should match the database in realtime. 
        // The manual update is due to the component not able to re-render in realtime with the button.

    // =========== STATE VARIABLES ==========================
    const [targetUser, setTargetUser] = useState(user); // State to hold user data
    const [token, setToken] = useState(window.localStorage.getItem('token'));
    let sessionUserID = getSessionUserID(token);
    const [friendRequested, setFriendRequested] = useState(targetUser.requests.some(requester => requester._id === sessionUserID));



    const handleFriendRequest = async (event) => {

        if (token) {
        event.preventDefault();

        // Step 1: PUT request for the session user to be added to this user's requests
        let putEndpoint = `/userData/${targetUser._id}/requests/`
        if (friendRequested){
            putEndpoint += 'unsend' //UsersController.UnsendFriendRequest if session user has already sent a friend request to the profile owner
        } else {
            putEndpoint += 'send' //UsersController.SendFriendRequest if session user has not sent a request yet.
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
            setTargetUser(getData.user)
            // setFriendRequested(targetUser.requests.some(requester => requester._id === sessionUserID)); // --> this API call & update do not happen fast enough. Cannot get button to re-render ontime.
            
            // hardcode setting friendRequested to !friendRequested until user reloads the page.
            // friendRequested status should match the database, since the component loads with db data, then manually updates as the button is pressed.
            setFriendRequested(!friendRequested) 
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