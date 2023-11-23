import React from 'react';
import formatFullDateString from '../utility/getFullDateString';
import convertRelativeDateTimeString from '../utility/getRelativeTimestamp';


const SingleComment = ({ comment}) => {


    const postedDateTime = new Date(comment.date_posted);
    // Full time is currently unused pending styling decisions
    const fullDateTimeString = formatFullDateString(postedDateTime)
    const relativeDateTimeString = convertRelativeDateTimeString(postedDateTime); 

    return (

      <div>
      <p>{comment.message} <i>posted {relativeDateTimeString} by User:{comment.user_id}</i></p>
      
        </div>

        )};
  

export default SingleComment;