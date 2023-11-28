import React from 'react';
import './whoLikedThisList.css';

const WhoLikedThisList = ({ post }) => {
  if (post.likes.length === 0) {
    return (
      <div className='who-likes-this-list'>
        <p className='who-likes-this-result'> No one liked this</p>
      </div>
    );
  }

  return (
    <div className='who-likes-this-list'>
      {post.likes.map((user, id) => (
        <div key={id} className='liked-user'>
          <a href={`/users/${user._id}`}>
            <img src={user.avatar} className='smallcirclemask' alt="Image Alt Text" />
          </a>
          <a href={`/users/${user._id}`}><span>{user.firstName} {user.lastName}</span></a>
        </div>
      ))}
    </div>
  );
};

export default WhoLikedThisList;
