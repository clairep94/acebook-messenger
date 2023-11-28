import React, { useEffect, useState } from 'react';
import './Post.css';
import getSessionUserID from '../utility/getSessionUserID';
import formatNumLikes from '../utility/getNumLikes';
import formatLikesUsersPreview from '../utility/getNumLikesUserPreview';
import formatFullDateString from '../utility/getFullDateString';
import convertRelativeDateTimeString from '../utility/getRelativeTimestamp';
import formatNumComments from '../utility/getNumComments';
import CommentsBox from '../comments/CommentsBox';
import NewCommentForm from '../CommentWrite/CommentWrite';
import WhoLikedThisList from '../wholikedthis/whoLikedThisList';
import { BiLike, BiSolidLike, BiCommentAdd, BiSolidCommentAdd,  BiCommentDetail, BiSolidCommentDetail} from "react-icons/bi";
import TrendingCalculator from '../utility/Trending';

const Post = ({ post }) => {

  // =========== STATE VARIABLES ==========================
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  let sessionUserID = getSessionUserID(token);
  // checks if sessionUserID is in user._id for user in post.likes --> array of Users, not user_id's due to populate in controllers/posts line 7-8
  const [userLiked, setUserLiked] = useState(post.likes.some(user => user._id === sessionUserID));
  const trendCalc = new TrendingCalculator()
  const isThisPostTrending = trendCalc.isPostTrending(post)


  // ============ LIKE BUTTON =============================
  const handleLikeSubmit = async (event) => {

    if (token) {
      event.preventDefault();

      // Step 1: PUT request for the session user to Like/Unlike the post
      fetch(`/posts/${post._id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({})
      }) // complete Put request & update token
        .then(async response => {
          let putData = await response.json();
          console.log("token", putData)
          window.localStorage.setItem("token", putData.token);
          setToken(window.localStorage.getItem("token"));

          // Step 2: Perform the GET request to fetch the updated post
          return fetch(`/posts/${post._id}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
        }) // Update post.likes to the data from the new GET request
        .then(getResponse => {
          if (!getResponse.ok) {
            throw new Error(`Failed to fetch updated post with ID ${post._id}`);
          }
          return getResponse.json();
        })
        .then(getData => {
          // Update the likes and userLiked state using the updated post data
          post.likes = getData.post.likes;
          setUserLiked(post.likes.some(user => user._id === sessionUserID));
        })
    }
  }
// ============= DISPLAYING REACTIONS ==================

  // "X like(s)" 
  const likes_formatted = formatNumLikes(post.likes)
  // "You/User and X others liked this"
  const likes_formatted_with_user_preview = formatLikesUsersPreview(post.likes, sessionUserID)


  // ------- FORMATTING TIME -------------
  const postedDateTime = new Date(post.date_posted);
  // '19 Nov 2023 at 5:45PM' 
  const fullDateTimeString = formatFullDateString(postedDateTime)
  // 'X seconds ago / X minutes ago / X hours ago / X days ago / fullDateTime 
  const relativeDateTimeString = convertRelativeDateTimeString(postedDateTime);

  // "X comment(s)"
  const num_comments = formatNumComments(post.comments)


  // -------- SET PROFILE PICTURE ------------  
  const fillerImage = `https://picsum.photos/seed/${post.user_id._id}/300` // 'real' profile pictures


//   let profilePicture = post.user_id.profilePictureURL;
//   if (profilePicture === null || "" || undefined){
//     profilePicture = fillerImage;
//   }



  // ======= SHOW COMMENTS BUTTON ===============
  const [showComments, setShowComments] = useState(false);

  const handleShowCommentsButton = (event) => {
    console.log(`Show comments pressed: ${showComments}`);
    setShowComments(!showComments);
    console.log(`Show comments: ${showComments}`);
  }

  // ======= SHOW LEAVE A COMMENT BUTTON ===============
    const [showNewCommentBox, setNewCommentBox] = useState(false);

    const handleShowNewCommentBoxButton = (event) => {
      console.log(`Show new comment pressed: ${showNewCommentBox}`);
      setNewCommentBox(!showNewCommentBox);
      console.log(`Show new comment: ${showNewCommentBox}`);
    }

  // ======= SHOW WHO LIKED THIS =============
  const [showWhoLikedThis, setShowWhoLikedThis] = useState(false);

  const handleShowWhoLikedThisButton = (event) => {
    console.log(`Show who liked this pressed: ${showWhoLikedThis}`);
    setShowWhoLikedThis(!showWhoLikedThis);
    console.log(`Show who liked this: ${showWhoLikedThis}`);

  }


// ========= JSX FOR THE UI OF THE COMPONENT =====================
  return (
    <article className='thread-container' data-cy="post" key={post._id}>
      <div className='post-container'>

        {/* LINKED USER PROFILE PIC */}
        <div class="circle-container">
        <a href={`/users/${post.user_id._id}`}>
          <img src={post.user_id.avatar} alt="Image Alt Text"/>
        </a>
        </div>{isThisPostTrending && (
        <span className="trending-label" role="img" aria-label="trending">🔥</span>
      )}


        <div class="author-and-timestamp">
          {/* LINKED USER FULL NAME */}
          <a href={`/users/${post.user_id._id}`}>
            <p className='user-full-name'>{ post.user_id.firstName } { post.user_id.lastName }</p> 
          </a>
          {/* RELATIVE DATE STAMP AND HOVER FULL DATE STAMP */}
          <div className='tooltip'>
            <p className='date-posted'>{relativeDateTimeString}</p>
              <span className='tooltiptext'>{fullDateTimeString}</span>
          </div>
        </div>

        <div className="content">
          {/* TEXT CONTENT */}
          <p className='message'>{post.message}</p>

          {/* Display image if available */}
          {post.imageUrl && (
            <img src={post.imageUrl} alt="Post" className="post-image" />
          )}
        </div>
        
        <div className='reactions'>
          {/* LIKE BUTTON */}
          <button onClick={handleLikeSubmit} className={userLiked ? 'unlike-button' : 'like-button'}>
            <div className='icon'>
            {userLiked ? <BiSolidLike /> : <BiLike />}
            </div>
          </button>

          {/* CLICKABLE NUMBER OF LIKES */}
          {/* TODO make number of likes clickable -- popup that shows each user who liked this */}
          <button onClick={handleShowWhoLikedThisButton} className='who-liked-this'>
            {/* <button onClick={handleWhoLikesThisSubmit} className='who-liked-this'> */}
            {/* <p className='likes'>{likes_formatted}</p> */}
            <p className='likes-users'>{likes_formatted_with_user_preview}</p>
          </button>

          <button onClick={handleShowCommentsButton} className='show-comments'>
            <p className='comments-num'><span className='icon'>{showComments ? <BiSolidCommentDetail /> : <BiCommentDetail />  }</span>   {num_comments}</p>
          </button>

          <button onClick={handleShowNewCommentBoxButton} className='show-leave-comment-box-button'>
            <p><span className='icon'>{showNewCommentBox ? <BiSolidCommentAdd /> :< BiCommentAdd/>  }</span>  Leave Comment</p>
          </button>
        </div>
      </div>  
      {/* WHO LIKED THIS CONTAINER */}
      <div className='who-liked-this-list' id={`parent_id: ${post._id}`}>
        {showWhoLikedThis && <WhoLikedThisList post={post}/>}
      </div>

      {/* COMMENTS CONTAINER */}
      <div className='comments-container' id={`parent_id: ${post._id}`}>
        {showComments && <CommentsBox post={post}/>}
        {showNewCommentBox && <NewCommentForm currentPost={post}/>}
      </div>


    </article>
  )
}

export default Post;
