import React from 'react';
import NewCommentForm from '../CommentWrite/CommentWrite';

const CommentsBox = ({ post }) => {
    return (
      <div>
        <b>Comments</b>
        {post.comments.length > 0 ? (
          // If there are comments
          <div>
            {post.comments.map((comment, index) => (
              <div key={index}>
                {comment.message} posted on {comment.date_posted} BY{' '}
                {comment.user_id}
              </div>
            ))}
          </div>
        ) : (
          // If there are no comments
          <div>No comments yet</div>
        )}
  
        {/* Render the NewCommentForm separately */}
        <NewCommentForm currentPost={post} />
      </div>
    );
  };

export default CommentsBox;
