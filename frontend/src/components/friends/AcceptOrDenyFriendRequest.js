import React, {useState, useEffect} from "react";
import getSessionUserID from "../utility/getSessionUserID";

const FriendRequestAcceptOrDenyButtons = ({user}) => {

    //These two buttons accept or deny the other user's friend request to the sessionUser.
    //If accepted, the other user will be added to the sessionUser's friends list.
    //For both situations, the other user will be wiped from the sessionUser's requests list.
    //For both situations, button refreshes the page.

    // =========== STATE VARIABLES ==========================
    const [otherUser, setOtherUser] = useState(user); // State to hold user data
    const [token, setToken] = useState(window.localStorage.getItem('token'));
    let sessionUserID = getSessionUserID(token);


    // ============== ACCEPT FRIEND REQUEST ============== //
    // this adds the otherUser to the sessionUser's friends and removes them from the sessionUser's requests.
    // this adds the sessionUser to the otherUser's friends
    const handleAcceptRequest = async (event) => {
        if (token) {
            event.preventDefault();
            let acceptRequestEndpoint = `/userData/friend_requests/${user._id}/accept`

            fetch(acceptRequestEndpoint, {
                method: 'put',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                })
            })
            .then(async response => {
                let putData = await response.json();
                if (response.status === 201){
                    console.log('Successful Friend Request Accept Put Request')

                    window.localStorage.setItem('token', putData.token);
                    setToken(window.localStorage.getItem('token'));
                    window.location.reload(); // Refresh the page after successful PUT request

                } else {
                    console.log('Unsuccessful Friend Request Accept Put Request')
                }
            })
        }
    }

    // ============== DENY FRIEND REQUEST ============== //
    // this removes the otherUser from the sessionUser's requests
    const handleDenyRequest = async (event) => {
        if (token) {
            event.preventDefault();
            let denyRequestEndpoint = `/userData/friend_requests/${user._id}/deny`

            fetch(denyRequestEndpoint, {
                method: 'put',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                })
            })
            .then(async response => {
                let putData = await response.json();
                if (response.status === 201){
                    console.log('Successful Friend Request Deny Put Request')

                    window.localStorage.setItem('token', putData.token);
                    setToken(window.localStorage.getItem('token'));
                    window.location.reload(); // Refresh the page after successful PUT request

                } else {
                    console.log('Unsuccessful Friend Request Deny Put Request')
                }
            })
        }
    }

    // ============ JSX UI ========================
    return (
    <div>
    <button className='friend-request-confirm-button' onClick={handleAcceptRequest}>
        Confirm Request
    </button>
    <button className='friend-request-deny-button' onClick={handleDenyRequest}>
        Delete Request
    </button>
    </div>
    )


}

export default FriendRequestAcceptOrDenyButtons;