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

    const handleAcceptRequest = async (event) => {
        console.log('Accepted!')
    }

    const handleDenyRequest = async (event) => {
        console.log('Denied!')
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