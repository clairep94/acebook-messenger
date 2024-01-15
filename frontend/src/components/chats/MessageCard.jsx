import React from "react";
import formatFullDateString from '../utility/getFullDateString';
import convertRelativeDateTimeString from '../utility/getRelativeTimestamp';


const MessageCard = (props) => {
    const message = props.message;
    const sessionUserID = props.sessionUserID;
    const div = props.div;
    
    // ------- FORMATTING TIME -------------
    const createdDateTime = new Date(message.createdAt);
    // '19 Nov 2023 at 5:45PM' 
    const fullDateTimeString = formatFullDateString(createdDateTime)
    // 'X seconds ago / X minutes ago / X hours ago / X days ago / fullDateTime 
    const relativeDateTimeString = convertRelativeDateTimeString(createdDateTime);



    return(
        <>

            <div className={message.author._id === sessionUserID ? "message own" : "message other"} ref={div}>
                <span>{message.body}</span>
                <span>{relativeDateTimeString}</span>
                
            </div>
            
                                            

        </>
    )
}

export default MessageCard;