import React, { useState, useEffect } from "react";
import getSessionUserID from "../utility/getSessionUserID";
import useFetchUserDataByID from "../utility/getselectuserinfo";
// import styles from './Chat.module.css'
// import {useSelector} from "react-redux";
import ConversationCard from "./ConversationCard";
import ChatBox from "./ChatBox";

import './Chats.css'

const Chats = () => {

    //TUTORIAL:
    // const {user} = useSelector((state)=>state.authReducer.authData);

    const [token, setToken] = useState(window.localStorage.getItem("token")); 
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);

    // SESSION USER:
    let sessionUserID = getSessionUserID(token);
    // const sessionUser = useFetchUserDataByID(sessionUserID);
    console.log("Checking sessionuserID")
    console.log(sessionUserID)


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
                <div className="Chat-container">
                <h2>Chats</h2>
                    {chats.map((chat) => (
                        <div onClick={() => {
                            setCurrentChat(chat);
                            console.log(`Choosing chat: ${chat._id}`)
                        }}>
                            <ConversationCard chatData={chat} sessionUserID={sessionUserID}/>
                        </div>
                    )
                        
                    )}

                </div>
            </div>
            {/* Right Side */}
            <div className="Right-side-chat">
                    <ChatBox currentChat={currentChat} sessionUserID={sessionUserID}/>
            </div>

        </div>
    )
}

export default Chats;