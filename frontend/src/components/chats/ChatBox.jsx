import React, { useEffect, useState } from 'react'
import './ChatBox.css'
import MessageCard from './MessageCard';
import InputEmoji from 'react-input-emoji';


const ChatBox = (props) => {
    const currentChat = props.currentChat;
    const sessionUserID = props.sessionUserID;
    const token = props.token
    const setToken = props.setToken;

    const conversationPartner = currentChat?.members?.find((user) => user._id !== sessionUserID); // fed chatData with .populate members

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");


    // fetch data for messages
    useEffect(() => {

        const fetchMessages = async () => {
            try {
                if (token && conversationPartner) {
                const response = await fetch(`/messages/${currentChat._id}`, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                
                window.localStorage.setItem("token", data.token);
                setToken(window.localStorage.getItem("token"));
                setMessages(data.allMessages);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
            };

        fetchMessages();

    }, [currentChat]);


    // sending messages
    const handleChange=(newMessage)=>{
        setNewMessage(newMessage);
    }

    const handleSend = async (event) => {

    // event.preventDefault(); // --> TOOK THIS OUT OTHERWISE THIS WONT WORK. IT STILL WRITES.

        const messageToSend = {
            chatID: currentChat._id,
            authorID: sessionUserID,
            body: newMessage
        }

        const receiverID = currentChat.members.find((member) => member._id !== sessionUserID);
        // send message to socket server
        // setSendMessage({...messageToSend, receiverID})
        // send message to database
        try {
            if (token && conversationPartner && newMessage.trim()) {
                
                const response = await fetch(`/messages/`, {
                    method: 'post',
                    headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify(messageToSend)
                });
                const data = await response.json();

                window.localStorage.setItem("token", data.token);
                setToken(window.localStorage.getItem("token"));
                setMessages([...messages, data.newMessage]);
                setNewMessage("");
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

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
                <div className="chat-body">

                    <>
                    {messages?.map((message) => (
                        <>
                            <MessageCard key={message._id} message={message} sessionUserID={sessionUserID} />
                        {message.author._id !== sessionUserID && 
                            ( <img src={`https://picsum.photos/seed/${message.author._id}/300`} 
                            className='followerImage'
                            style={{width:'40px', height:'40px'}}
                            />
                            )
                            }
                        </>
                        ))
                    }                    
              </>

              THIS ONE WORKS BUT THE ONE BELOW DOESN"T
              <InputEmoji 
                                      value={newMessage? newMessage : ""}
                        cleanOnEnter
                        onChange={handleChange}
                        onEnter={handleSend}
                        placeholder='Type a message...'

              />
                    TO DO: CHAT BODY - add auth back to routes<br/>
                    Change Chat.gap and height of chats list<br/>
                    Add real-time notifications<br/>
                    Re-organise codebase<br/>

                </div>
                <div className="chat-sender">
                    <div>+</div>
                    <InputEmoji
                        value={newMessage? newMessage : ""}
                        cleanOnEnter
                        onChange={handleChange}
                        onEnter={handleSend}
                        placeholder='Type a message...'
                    />
                    {/* <div className="send-button button" onClick = {handleSend}>Send</div> */}
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