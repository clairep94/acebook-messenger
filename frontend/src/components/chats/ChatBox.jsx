import React, { useEffect, useState } from 'react'
import './ChatBox.css'
import MessageCard from './MessageCard';

const ChatBox = (props) => {
    const currentChat = props.currentChat;
    const sessionUserID = props.sessionUserID;
    const token = props.token
    const setToken = props.setToken;

    const conversationPartner = currentChat?.members?.find((user) => user._id !== sessionUserID); // fed chatData with .populate members

    const [messages, setMessages] = useState([]);

    // fetch data for messages
    useEffect(() => {
        // if (token && conversationPartner) {
        //     fetch(`/messages/${currentChat._id}`, {
        //         headers: {
        //         'Authorization': `Bearer ${token}` 
        //         }
        //     })
        //     .then(response => response.json())
        //     .then(async data => {
        //         window.localStorage.setItem("token", data.token)
        //         setToken(window.localStorage.getItem("token"))

        //         setMessages(data.allMessages);
        //     })
        // }
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
    }, [currentChat])


    // sending messages

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

                    

                    TO DO: CHAT BODY - add auth back to routes<br/>
                    Change Chat.gap and height of chats list<br/>
                    Add socket.io<br/>
                    Add real-time notifications<br/>
                    Re-organise codebase<br/>

                </div>
                <div className="chat-sender">
                    TO DO: CHAT SENDER
                    <input
                    type="file"
                    name=""
                    id=""
                    style={{ display: "none" }}
                    // ref={imageRef}
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