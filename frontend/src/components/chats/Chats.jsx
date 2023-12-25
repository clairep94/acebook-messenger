import React, { useState, useEffect, useRef } from "react";
import getSessionUserID from "../utility/getSessionUserID";
import useFetchUserDataByID from "../utility/getselectuserinfo";
// import {useSelector} from "react-redux";
import ConversationCard from "./ConversationCard";
import ChatBox from "./ChatBox";

import {io} from 'socket.io-client';
import { fetchChats } from "../../api_calls/chatsAPI";

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
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

    // connect to socket.io
    useEffect(()=> {
        socket.current = io('http://localhost:8800'); // this is the socket port
        socket.current.emit("new-user-add", sessionUserID); // send the sessionUserID to the socket server
        socket.current.on('get-users', (users)=>{
            setOnlineUsers(users)}) // get the onlineUsers, which should now include the sessionUserID
    }, [sessionUserID])

    // send message to the socket server;
    useEffect(() => {
        if(sendMessage!==null){
            socket.current.emit("send-message", sendMessage);

        }
    },[sendMessage])

    // get message from the socket server;
    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            console.log(data);
            setReceivedMessage(data);
        })

    }, [])

    // checks if a certain user in a chat is online (connected to socket.io)
    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member._id !== sessionUserID);
        const online = onlineUsers.find((user) => user.userID === chatMember);
        return online ? true : false;
    };
    


    // ===== GET ALL CHATS WHEN THE COMPONENT MOUNTS ======
    useEffect( () => {
        if (token) {

            fetchChats(token, sessionUserID) // async function that returns all chatData

            .then(chatData => {
                window.localStorage.setItem("token", chatData.token)
                setToken(window.localStorage.getItem("token"))

                setChats(chatData.chats);
                console.log(chatData.chats);

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
                    <ChatBox currentChat={currentChat} sessionUserID={sessionUserID} token={token} setToken={setToken} setSendMessage={setSendMessage} receivedMessage={receivedMessage}/>
            </div>

        </div>
    )
}

export default Chats;