import React, { useState } from 'react';
import NewCommentForm from '../CommentWrite/CommentWrite';
import SingleComment from './singlecomment';


const CommentsBox = ({ post }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  
  return (
    <div>
      {/* <b>Comments</b> */}
      {post.comments.length > 0 ? (
        // If there are comments
        <div>
          {post.comments.map((comment) => ( <SingleComment comment={comment} key={comment._id} /> ))}
        </div>
      ) : (
        // If there are no comments
        <div>No comments yet</div>
      )}
      <NewCommentForm currentPost={post} />
    </div>
  );
};

export default CommentsBox;
