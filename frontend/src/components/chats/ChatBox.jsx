import React from 'react'
import './ChatBox.css'

const ChatBox = (props) => {
    const currentChat = props.currentChat;
    const sessionUserID = props.sessionUserID;

    const conversationPartner = currentChat?.members?.find((user) => user._id !== sessionUserID); // fed chatData with .populate members

  return (
      <>
        <div className="ChatBox-container">
            {currentChat ? (
            <>
                <div className="chat-header">
                <div className="follower">
                    <div>
                        <img src={`https://picsum.photos/seed/${conversationPartner}/300`} 
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