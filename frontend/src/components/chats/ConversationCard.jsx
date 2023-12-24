import React from 'react'
import useFetchUserDataByID from "../utility/getselectuserinfo";



const ConversationCard = (props) => {
    const chatData = props.chatData;
    const sessionUserID = props.sessionUserID;
    
    // const conversationPartner = chatData.members.find((id) => id !== sessionUserID);
    const conversationPartner = chatData.members.find((user) => user._id !== sessionUserID); // fed chatData with .populate members

    
  return (
    <>
        <div className="conversation" >
            <div>
                <div className="online-dot"></div>

                <img src={`https://picsum.photos/seed/${conversationPartner}/300`} 
                    className='followerImage'
                    style={{width:'50px', height:'50px'}}
                />
                <div className='name' style={{fontSize: "0.8rem", fontFamily: "'Arial', sans-serif"}}>
                    <span>{`${conversationPartner.firstName} ${conversationPartner.lastName}`}</span>
                    <span style={{color: "grey"}}>Online</span>
                </div>
            
            </div>
        </div>
        <hr style={{width: '85%', border: '0.1px solid #ececec'}}/>
    </>
  )
}

export default ConversationCard