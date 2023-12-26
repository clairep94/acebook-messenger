import React, { useState, useEffect, useRef } from "react";
import getSessionUserID from "../utility/getSessionUserID";
import useFetchUserDataByID from "../utility/getselectuserinfo";
// import {useSelector} from "react-redux";
import ConversationCard from "./ConversationCard";
import ChatBox from "./ChatBox";
import ChatSearchBar from "./ChatSearchBar/ChatSearchBar";
import ChatSearchResultsList from "./ChatSearchBar/ChatSearchResultsList";

import {io} from 'socket.io-client';
import { fetchChats, createChat } from "../../api_calls/chatsAPI";

import './Chats.css'

const Chats = () => {

    // ======= STATES & PROPS =========================================
    // Session info:
    // const {user} = useSelector((state)=>state.authReducer.authData); //TUTORIAL
    const [token, setToken] = useState(window.localStorage.getItem("token")); //TODO lift this to app/page?
    let sessionUserID = getSessionUserID(token); //TODO lift this to app/page?

    // Loading the component:
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);

    // Socket setup: // TODO lift this to app?
    const socket = useRef()
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

    // Chatsearch Results
    const [chatSearchResults, setChatSearchResults] = useState([]);


    // ============= FUNCTIONS ===========================================

    // ------------ GET ALL CHATS WHEN THE COMPONENT MOUNTS --------------------
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

    // ----------- SOCKET ---------------------------------
    // Connect to socket.io when users visit the messages page //TODO lift this to app after login?
    useEffect(()=> {
        socket.current = io('http://localhost:8800'); // this is the socket port
        socket.current.emit("new-user-add", sessionUserID); // send the sessionUserID to the socket server
        socket.current.on('get-users', (users)=>{
            setOnlineUsers(users)}) // get the onlineUsers, which should now include the sessionUserID
    }, [sessionUserID])

    // Send messages to the socket server;
    // Listens to ChatBox to see if it setSendMessage something new
    useEffect(() => {
        if(sendMessage!==null){
            socket.current.emit("send-message", sendMessage);
        }
    },[sendMessage])

    // Get new messages from the socket server;
    // Listens to the socket server to see if there are "receive-message" signals
    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            console.log("recieved data in chats.jsx:", data);
            
            setReceivedMessage(data);
            console.log("current received message: ", receivedMessage);
        })
    }, [])

    // Checks if a certain user in a chat is online (connected to socket.io)
    const checkOnlineStatus = (chat) => {
        if (chat) {
            const chatMember = chat.members.find((member) => member._id !== sessionUserID);
            const online = onlineUsers.find((user) => user.userID === chatMember._id);
            return online ? true : false;

        }
    };
    


    // =============== UI FOR THE COMPONENT ========================
    return (
        <div className="Chat">
            {/* Left Side */}
            <div className="Left-side-chat">
                <div className="Chat-search">
                    <ChatSearchBar setChatSearchResults={setChatSearchResults} token={token} setToken={setToken}/>
                
                </div>
                <div className="Chat-search-results">
                    <ChatSearchResultsList chatSearchResults={chatSearchResults}/>
                </div>

                <div className="Chat-container">
                <h2>Chats</h2>
                    {chats.map((chat) => (
                        <div onClick={() => {
                            setCurrentChat(chat);
                            console.log(`Choosing chat: ${chat._id}`)
                        }}>
                            <ConversationCard chatData={chat} sessionUserID={sessionUserID} online={checkOnlineStatus(chat)}/>
                        </div>
                    )
                        
                    )}
                    {/* <p>Visibility test: {receivedMessage?.body}{receivedMessage?.author.firstName}</p> */}
                </div>
            </div>
            {/* Right Side */}
            <div className="Right-side-chat">
                    <ChatBox currentChat={currentChat} online={checkOnlineStatus(currentChat)} sessionUserID={sessionUserID} token={token} setToken={setToken} setSendMessage={setSendMessage} receivedMessage={receivedMessage}/>
            </div>

        </div>
    )
}

export default Chats;