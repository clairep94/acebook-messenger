import React, { useState, useEffect, useRef } from "react";
import getSessionUserID from "../utility/getSessionUserID";
import useFetchUserDataByID from "../utility/getselectuserinfo";
// import styles from './Chat.module.css'
// import {useSelector} from "react-redux";
import ConversationCard from "./ConversationCard";
import ChatBox from "./ChatBox";

import {io} from 'socket.io-client';

import './Chats.css'

const Chats = (session) => {

    //TUTORIAL:
    // const {user} = useSelector((state)=>state.authReducer.authData);

    const [token, setToken] = useState(window.localStorage.getItem("token")); 
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    // SESSION USER:
    let sessionUserID = getSessionUserID(token);


    // SOCKET STUFF:
    const socket = useRef()
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState("");

    useEffect(()=> {
        socket.current = io('http://localhost:8800'); // this is the socket port
        socket.current.emit("new-user-add", sessionUserID); // send the sessionUserID to the socket server
        socket.current.on('get-users', (users)=>{setOnlineUsers(users)}) // get the onlineUsers, which should now include the sessionUserID
    }, [sessionUserID])

    useEffect(() => {
        if(sendMessage!==null){
            socket.current.emit("send-message", sendMessage);

        }
    })

    


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
                <p>TODO: Add searchbar to create a chat</p>
                <p>TODO: Make this component to height of page</p>

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
                    <ChatBox currentChat={currentChat} sessionUserID={sessionUserID} token={token} setToken={setToken} setSendMessage={setSendMessage}/>
            </div>

        </div>
    )
}

export default Chats;