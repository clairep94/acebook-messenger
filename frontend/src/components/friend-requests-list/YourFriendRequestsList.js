import React, {useState, useEffect} from "react";
import YourSingleFriendRequest from "./YourSingleFriendRequest";
import useFetchUserDataByID from "../utility/getselectuserinfo";
import getSessionUserID from '../utility/getSessionUserID';
import './YourFriendRequestsList.css'


// Friends List
const YourFriendRequestsList = () => {

    // ======= STATE VARIABLES ==========
    // TODO LIFT THESES:
    //navigate
    // sessionUserID or sessionUserData

    const [requests, setRequests] = useState([])
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    let sessionUserID = getSessionUserID(token);

    // =========== GET ALL OF YOUR FRIENDS WHEN THE COMPONENT MOUNTS =========================
    useEffect(() => {
        if (token) {
            fetch(`/userData/${sessionUserID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                })
                .then((res) => res.json())
                .then(async (data) => {
                    window.localStorage.setItem('token', data.token);
                    setToken(data.token);
                    setRequests(data.user.requests);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
            }
    }, []);
    

    
    // ========== JSX UI =================
    return (
    
        <>
        <div className="friend-requests-list">
            {requests.map ((request,id) => {
                return <YourSingleFriendRequest request={request} key={id}/>
            })}
        </div>
        </>
    );


}

export default YourFriendRequestsList