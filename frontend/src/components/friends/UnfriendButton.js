import React, {useState, useEffect} from "react";
import getSessionUserID from "../utility/getSessionUserID";


const UnfriendButton = ({user}) => {
    //This button deletes the targetUser from the sessionUser's friends and vice versa
    
    // =========== STATE VARIABLES ==========================
    const [otherUser, setOtherUser] = useState(user); // State to hold user data
    const [token, setToken] = useState(window.localStorage.getItem('token'));
    let sessionUserID = getSessionUserID(token);
    
    // =========== UNFRIEND =======================
    const handleUnfriend = async (event) => {
        if (token) {
            event.preventDefault();
            let unfriendEndpoint = `/userData/friends/${otherUser._id}/unfriend`

            fetch(unfriendEndpoint, {
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
                    console.log('Successful Unfriend Put Request')

                    window.localStorage.setItem('token', putData.token);
                    setToken(window.localStorage.getItem('token'));
                    window.location.reload(); // Refresh the page after successful PUT request

                } else {
                    console.log('Unsuccessful Unfriend Put Request')
                }
            })
        }
    }

    // ============ JSX UI ========================
    return (
        <div>
            <button className='unfriend-button' onClick={handleUnfriend}>
            Unfriend
            </button>
        </div>
    )

}

export default UnfriendButton;