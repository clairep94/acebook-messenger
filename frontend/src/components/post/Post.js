import React from 'react';
import './Post.css';

const Post = ({post}) => {

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

  return(
    <article className='post-container' data-cy="post" key={ post._id }>
      {/* change below to display name later */}
      <h3 className='user-display-name'>{ post.user_id.email }</h3> 
      {/* change below to display date nicer later */}
      <p className='date-posted'>{ post.date_posted }</p>
      <p className='message'>{ post.message }</p>
      <p className='likes'>{ likes_formatted }</p>
      {/* <p className='test-likes-users'>{ post.liked_by.email }</p> */}
      
    </article>
  )
}

export default Post;
