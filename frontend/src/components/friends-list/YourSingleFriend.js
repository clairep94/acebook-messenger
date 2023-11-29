import React from "react";
import './SingleFriend.css'
import UnfriendButton from "../friends/UnfriendButton";


const YourSingleFriend = ({friend, id}) => {
    return (
        <div className="single-friend-card" key={id}>
            <a href={`/users/${friend._id}`}>
                {/* TODO */}
                {/* <img src={user.avatar} className='smallcirclemask' alt="Image Alt Text" /> */}
                <img className='profilepic-friends-list-med' src={`https://picsum.photos/seed/${friend._id}/300`}/>
            </a>
            <a href={`/users/${friend._id}`}>
                <p className='single-friend-name-span'>{`${friend.firstName} ${friend.lastName}`}</p>
                </a>
            <span className="unfriend-button-span"><UnfriendButton user={friend}/></span>
        </div>    
    )
}

export default YourSingleFriend;