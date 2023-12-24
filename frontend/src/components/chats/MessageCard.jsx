import React from "react";

const MessageCard = (props) => {
    const message = props.message;
    const sessionUserID = props.sessionUserID;


    return(
        <>
            <div className={message.author._id === sessionUserID ? "message own" : "message other"}>
                <span>{message.body}</span>
                <span>{message.createdAt}</span>
                <span>{message.author.firstName} {message.author.lastName}</span>
            </div>
        </>
    )
}

export default MessageCard;