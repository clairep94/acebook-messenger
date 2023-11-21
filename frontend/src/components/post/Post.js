import React, { useEffect, useState } from 'react';
import './Post.css';
import getSessionUserID from '../utility/getSessionUserID';
import formatNumLikes from '../utility/getNumLikes';
import formatLikesUsersPreview from '../utility/getNumLikesUserPreview';
import formatFullDateString from '../utility/getFullDateString';
import convertRelativeDateTimeString from '../utility/getRelativeTimestamp';


const Post = ({ post }) => {

  // =========== STATE VARIABLES ==========================
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  let sessionUserID = getSessionUserID(token);
  // checks if sessionUserID is in user._id for user in post.likes --> array of Users, not user_id's due to populate in controllers/posts line 7-8
  const [userLiked, setUserLiked] = useState(post.likes.some(user => user._id === sessionUserID));


  // ============ LIKE BUTTON =============================
  const handleLikeSubmit = async (event) => {

    if (token) {
      event.preventDefault();

      // Step 1: Put request for the session user to Like/Unlike the post
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

  // ============= DISPLAYING LIKES ==================

  // --------- "X like(s)" ---------------
  const likes_formatted = formatNumLikes(post.likes)

  // --------- "You/User and X others liked this" ---------------
  const likes_formatted_with_user_preview = formatLikesUsersPreview(post.likes, sessionUserID)


  // ======== FORMATTING TIME ==============
  const postedDateTime = new Date(post.date_posted);

  // ------------ '19 Nov 2023 at 5:45PM' -------------
  const fullDateTimeString = formatFullDateString(postedDateTime)

  // ------------ 'X seconds ago / X minutes ago / X hours ago / X days ago / fullDateTime --------------
  const relativeDateTimeString = convertRelativeDateTimeString(postedDateTime);


  // ========= JSX FOR THE UI OF THE COMPONENT =====================
  return (
    <article className='post-container' data-cy="post" key={post._id}>
      {/* change below to display name later */}
      <a href={`/user/${post.user_id._id}`}>
        <h3 className='user-display-name'>{post.user_id.email}</h3> </a>
      {/* choose one format later */}
      <p className='date-posted'>{fullDateTimeString}</p>
      <p className='date-posted'>{relativeDateTimeString}</p>

      <p className='message'>{post.message}</p>

      {/* choose one format later */}
      <p className='likes'>{likes_formatted}</p>
      {/* change this to be a link to see a list of all users who liked this */}
      <p className='test-likes-users'>{likes_formatted_with_user_preview}</p>
      {/* Display image if available */}
      {post.imageUrl && (
        <img src={post.imageUrl} alt="Post" className="post-image" />
      )}

      <button onClick={handleLikeSubmit} className={userLiked ? 'unlike-button' : 'like-button'}>{userLiked ? 'Unlike' : 'Like'}</button>
    </article>
  )
}

export default Post;
