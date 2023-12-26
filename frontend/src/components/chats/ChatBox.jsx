import React, { useEffect, useState, useRef } from 'react'
import './ChatBox.css'
import MessageCard from './MessageCard';
import InputEmoji from 'react-input-emoji';
import { fetchMessages, sendMessage } from '../../api_calls/messagesAPI';


const ChatBox = (props) => {
    // ======= STATES & PROPS =========================================
    // Loading the component:
    const currentChat = props.currentChat;
    const sessionUserID = props.sessionUserID;
    const token = props.token
    const setToken = props.setToken;
    const conversationPartner = currentChat?.members?.find((user) => user._id !== sessionUserID); // fed chatData with .populate members

    // Loading messages, sending messages, receiving messages:
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const setSendMessage = props.setSendMessage; // Chats.jsx parent component has a useEffect hook to send to socket.io
    const receivedMessage = props.receivedMessage; // Chats.jsx parent component has a useEffect hook to recieve from socket.io


    // ============= FUNCTIONS ===========================================

    // --------- FETCHING ALL MESSAGES FOR A CERTAIN CHAT WHEN A CHAT IS SELECTED -----------
    useEffect(() => {
        if (token && conversationPartner && currentChat) {

            fetchMessages(token, currentChat) // see 'src/api_calls/messagesAPI'
            .then(messagesData => {
                window.localStorage.setItem("token", messagesData.token)
                setToken(window.localStorage.getItem("token"))

                setMessages(messagesData.allMessages);
                console.log(messagesData.allMessages);
            })
        }
    }, [currentChat]);


    // --------- SENDING A NEW MESSAGE ------------------------------------------

    // Change newMessage when something is written to InputEmoji 
    const handleChange=(newMessage)=>{
        setNewMessage(newMessage); // --> Don't need to use event.target because it is not a 'form'
    }

    // Sending a message to both the Backend API and socket.io 
    const handleSend = async (event) => {

        // event.preventDefault(); // --> This is not needed for InputEmoji, as it is not a 'form'

        const receiver = currentChat.members.find((member) => member._id !== sessionUserID);
        const receiverID = receiver._id

        const messageToSend = {
            chatID: currentChat._id,
            authorID: sessionUserID,
            body: newMessage
        }

        // Send the message to the database:
        if (token && conversationPartner && newMessage.trim()) { // check that there is a conversationPartner and that newMessage is not all whitespaces
            sendMessage(token, messageToSend)
            .then(sentMessageData => {
                window.localStorage.setItem("token", sentMessageData.token)
                setToken(window.localStorage.getItem("token"))

                // add newMessage to the messages array:
                setMessages([...messages, sentMessageData.newMessage]);

                // send message to the socket server: -- check if this needs to be separate
                setSendMessage({...sentMessageData.newMessage, receiverID}); // this adds receiverID: receiverID to messageToSend

                // clear newMessage: -- check if this needs to be after
                setNewMessage("");
            })
        }
    }

    // --------- RECEIVING A NEW MESSAGE ------------------------------------------
    // This component is fed receivedMessage from the parent Chat.jsx.
    // The useEffect hook will listen for changes to receivedMessage and add it to the messages array for re-rendering.
    useEffect(() => {
        if(receivedMessage){ // should add && receivedMessage._id === currentChat._id
            console.log("Message Arrived: ", receivedMessage);

            const newMessage = { // needed to create new object in order to push successfully to messages.
                _id: receivedMessage._id,
                chat_id: receivedMessage.chat_id,
                author: receivedMessage.author,
                body: receivedMessage.body,
                createdAt: receivedMessage.createdAt,
                updatedAt: receivedMessage.updatedAt,
            }
            setMessages([...messages, newMessage]);
        }
    }, [receivedMessage])
    // useEffect(() => {
    //     if (receivedMessage && receivedMessage._id === currentChat._id) {
    //         console.log("Message Arrive: ", receivedMessage);
    //         setMessages([...messages, receivedMessage]);
    //     };
    // }, [receivedMessage])



    // Always scroll to last Message
    const div = useRef(null)
    useEffect(()=> {
        div.current?.scrollIntoView({ behavior: "smooth", block:"end" });
    },[messages])


    // =============== UI FOR THE COMPONENT ========================
    return (
        <>
            <div className="ChatBox-container">
                {currentChat ? (
                <>
                    <div className="chat-header">
                    <div className="follower">
                        <div>
                            <img src={`https://picsum.photos/seed/${conversationPartner._id}/300`} 
                                className='followerImage'
                                style={{width:'50px', height:'50px'}}
                                alt={`${conversationPartner.firstName} ${conversationPartner.lastName}`}
                            />
                            <div className="name" style={{ fontSize: "0.9rem" }}>
                                <span>
                                {conversationPartner?.firstName} {conversationPartner?.lastName}
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr
                        style={{
                            width: "95%",
                            border: "0.1px solid #ececec",
                            marginTop: "20px",
                        }}
                    />
                    </div>
                    <div className="chat-body" ref={div}>
                        <>
                        {/* Message card per message and profile picture if not sessionUser */}
                        {messages.map((message) =>( message && 
                            <>
                            <MessageCard key={message?._id} message={message} sessionUserID={sessionUserID} div={div}/>
                                <>
                                {message.author._id !== sessionUserID && ( <img src={`https://picsum.photos/seed/${message.author._id}/300`} alt={`${message.author.firstName}`} className='followerImage' style={{width:'40px', height:'40px'}} />)}
                                </>
                            </>))}

                        </>

                    </div>
                    <div className="chat-sender">
                        <div>+</div>
                        {/* Input Field from React Lib for writing a new message, can add emojis */}
                        <InputEmoji 
                            value={newMessage? newMessage : ""}
                            cleanOnEnter
                            onChange={handleChange}
                            onEnter={handleSend}
                            placeholder='Type a message...'
                        />
                    </div>
                    
                    
                </>)


                : (
                    <span className="chatbox-empty-message" style={{color: "grey"}}>
                        Tap on a chat to start conversation...
                    </span>
                )}
            </div>
        </>
        )
}


export default ChatBox