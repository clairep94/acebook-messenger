import React, {useState, useEffect} from "react";
import YourSingleFriend from "./YourSingleFriend";
import useFetchUserDataByID from "../utility/getselectuserinfo";
import getSessionUserID from '../utility/getSessionUserID';
import './YourFriendsList.css'


// Friends List
const YourFriendsList = () => {

    // ======= STATE VARIABLES ==========
    // TODO LIFT THESES:
    //navigate
    // sessionUserID or sessionUserData

    const [friends, setFriends] = useState([])
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
                    setFriends(data.user.friends);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
            }
    }, []);
    

    
    // ========== JSX UI =================
    return (
    
        <>
        <div className="friends-list">
            {friends.map ((friend,id) => {
                return <YourSingleFriend friend={friend} key={id}/>
            })}
        </div>
        </>
    );


}

export default YourFriendsList