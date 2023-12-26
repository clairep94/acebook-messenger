import React from "react";
import "./ChatSearchResult.css"


export const ChatSearchResult = ({result, id}) => {

    // NEED TO FEED IN:
    // Create Chat API
    // SEARCH CHAT
    // If chat already exists, just setCurrentChat to chat_id
    // CREATE CHAT
    // If chat does not already exist, create Chat, then setCurrentChat to chat_id
    // Feed in all chats by member, from parent component.
    // Feed in token & sessionUserID


    return (
    <div className="chat-search-result" key={id} onClick={()=>{console.log('clicked!')}}>
        <a href={`/users/${result._id}`}>
            {/* <img src={user.avatar} className='smallcirclemask' alt="Image Alt Text" /> */}
            <img className='smallcirclemask' src={`https://picsum.photos/seed/${result._id}/300`}/>
            <span className='who-liked-this-span'>{`${result.firstName} ${result.lastName}`}</span>
        </a>
    </div>
    )
}