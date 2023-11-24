import React from 'react';
import formatFullDateString from '../utility/getFullDateString';
import convertRelativeDateTimeString from '../utility/getRelativeTimestamp';
import useFetchUserDataByID from '../utility/getselectuserinfo';
import './singlecomment.css';

const SingleComment = ({ comment }) => {

    const postedDateTime = new Date(comment.date_posted);
    const fullDateTimeString = formatFullDateString(postedDateTime);
    const relativeDateTimeString = convertRelativeDateTimeString(postedDateTime);
    const userID = comment.user_id;
    const FoundUser = useFetchUserDataByID(userID);
    const AuthorFirstName = FoundUser && FoundUser.firstName ? FoundUser.firstName : '';
    const AuthorLastName = FoundUser && FoundUser.lastName ? FoundUser.lastName : '';
    const fillerImage = `https://picsum.photos/seed/${comment.user_id}/300`
    const AuthorProfilePic = FoundUser && FoundUser.profilePictureURL ? FoundUser.profilePictureURL : fillerImage;


    // TEMPORARY VERSION -- No reaction abilities, no nested comments. ==========

    return (
        <div className='comment-container'>

            {/* LINKED USER PROFILE PIC */}
            <div class="circle-container-comment">
                <a href={`/users/${comment.user_id}`}>
                <img src={AuthorProfilePic} alt="Image Alt Text"/>
                </a>
            </div>

            <div class="author-and-timestamp-comment">
            {/* LINKED USER FULL NAME */}
            <a href={`/users/${comment.user_id}`}>
                <p className='user-full-name-comment'>{ AuthorFirstName } { AuthorLastName }</p> 
            </a>
            {/* RELATIVE DATE STAMP AND HOVER FULL DATE STAMP */}
            <div className='tooltip-comment'>
                <p className='date-posted-comment'>{relativeDateTimeString}</p>
                <span className='tooltiptext-comment'>{fullDateTimeString}</span>
            </div>
            </div>

            <div className="content-comment">
            {/* TEXT CONTENT */}
            <p className='message-comment'>{comment.message}</p>

            {/* Display image if available */}
            {comment.imageUrl && (
                <img src={comment.imageUrl} alt="Comment" className="comment-image" />
            )}
            </div>

            <div className='reactions-comments'>
                {/* <p></p> */}
                {/* TODO  -- update with reactions bar from posts, once nesting is figured out*/}
            </div>

        </div>
    )


    // // OLD VERSION:
    // return (
    //     <div>
    //         {console.log(FoundUser)}
    //         <p>{comment.message} <i>posted {relativeDateTimeString} by {AuthorFirstName} {AuthorLastName}</i></p>
    //     </div>
    // );
};

export default SingleComment;