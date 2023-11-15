import React from 'react';
import './Post.css';

const Post = ({post}) => {

  // formats likes arr into '2 likes'...
  const formatLikes = (arr) => {
    const numLikes = arr.length;

    if (numLikes === 1){
      return "1 like"
    } else {
      return `${numLikes} likes`
    }}

  const likes_formatted = formatLikes(post.likes)
  console.log(post.message)
  console.log(post.likes)


  // formats likes arr into 'claire@email.com and 2 other liked this...'
  const formatLikesUsersPreview = (arr) => {
    const numLikes = arr.length;

    if (numLikes === 0){
      return "Noone liked this"
    } else if (numLikes === 1){
      return `${arr[0].email} liked this` // change so that if the user has liked this, it says "You and ... others like this"
    } else {
      return `${arr[0].email} and ${numLikes - 1} others liked this`
    }
  }
  
  const likes_formatted_with_user_preview = formatLikesUsersPreview(post.likes)

  return(
    <article className='post-container' data-cy="post" key={ post._id }>
      {/* change below to display name later */}
      <h3 className='user-display-name'>{ post.user_id.email }</h3> 
      {/* change below to display date nicer later */}
      <p className='date-posted'>{ post.date_posted }</p>
      <p className='message'>{ post.message }</p>

      {/* choose one format later */}
      <p className='likes'>{ likes_formatted }</p>
      {/* change this to be a link to see a list of all users who liked this */}
      <p className='test-likes-users'>{ likes_formatted_with_user_preview }</p>
      
    </article>
  )
}

export default Post;
