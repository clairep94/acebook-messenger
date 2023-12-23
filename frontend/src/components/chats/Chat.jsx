import React, { useState, useEffect } from "react";
import getSessionUserID from "../utility/getSessionUserID";
import useFetchUserDataByID from "../utility/getselectuserinfo";
// import styles from './Chat.module.css'
// import {useSelector} from "react-redux";

import './Chat.css'

const Chat = () => {

    //TUTORIAL:
    // const {user} = useSelector((state)=>state.authReducer.authData);

    const [token, setToken] = useState(window.localStorage.getItem("token")); 
    const [chats, setChats] = useState([]);

    // SESSION USER:
    let sessionUserID = getSessionUserID(token);
    const sessionUser = useFetchUserDataByID(sessionUserID);
    console.log(sessionUser)


    // ===== GET ALL CHATS WHEN THE COMPONENT MOUNTS ======
    useEffect( () => {
        if (token) {
            fetch(`/chats/${sessionUserID}`, {
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })
            .then(response => response.json())
            .then(async data => {
                window.localStorage.setItem("token", data.token)
                setToken(window.localStorage.getItem("token"))

                setChats(data.chats);
                console.log(data.chats);

            })
        }
    }, [])


    return (
        <div className="Chat">
            {/* Left Side */}
            <div className="Left-side-chat">
                <h2>Chats</h2>
                <div className="Chat-list">
                    Conversations
                    <br>
                    </br>
                    Number of chats: {chats ? chats.length: 0}
                </div>
            </div>
            {/* Right Side */}
            <div className="Right-side-chat">
                Right side
            </div>

        </div>
    )
}

export default Chat;