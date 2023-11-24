import React, { useEffect, useState } from 'react';
import DisplayUser from './displayUser';
import './whoLikedThisList.css'

const WhoLikedThisList = ({post}) => {

    if (post.likes.length === 0){
        return(
            <div className='who-likes-this-list'>
                <p className='who-likes-this-result'> No one liked this</p>
            </div>
        )
    }
    return (
        <div className='who-likes-this-list'>
            {post.likes.map ((user, id) => {
                return (<p className='who-likes-this-result'><a href={`/users/${user._id}`} className='who-likes-this-result'>{user.firstName} {user.lastName}</a></p>)
            })}
        </div>

    )}

export default WhoLikedThisList;