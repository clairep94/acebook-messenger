import React from 'react';
import formatFullDateString from '../utility/getFullDateString';
import convertRelativeDateTimeString from '../utility/getRelativeTimestamp';
import useFetchUserDataByID from '../utility/getselectuserinfo';

const SingleComment = ({ comment }) => {

    const postedDateTime = new Date(comment.date_posted);
    const fullDateTimeString = formatFullDateString(postedDateTime);
    const relativeDateTimeString = convertRelativeDateTimeString(postedDateTime);
    const userID = comment.user_id;
    const FoundUser = useFetchUserDataByID(userID);
    const AuthorFirstName = FoundUser && FoundUser.firstName ? FoundUser.firstName : '';
    const AuthorLastName = FoundUser && FoundUser.lastName ? FoundUser.lastName : '';

    return (
        <div>
            {console.log(FoundUser)}
            <p>{comment.message} <i>posted {relativeDateTimeString} by {AuthorFirstName} {AuthorLastName}</i></p>
        </div>
    );
};

export default SingleComment;