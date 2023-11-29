import React from "react";
import FriendRequestAcceptOrDenyButtons from "../friends/AcceptOrDenyFriendRequest";
import './SingleFriendRequest.css';

const YourSingleFriendRequest = ({request, id}) => {
    return (
        <div className="single-friend-request-card" key={id}>
            <a href={`/users/${request._id}`}>
                {/* TODO */}
                {/* <img src={user.avatar} className='smallcirclemask' alt="Image Alt Text" /> */}
                <img className='profilepic-friend-requests-list-med' src={`https://picsum.photos/seed/${request._id}/300`}/>
            </a>
            <a href={`/users/${request._id}`}>
                <p className='single-friend-request-name-span'>{`${request.firstName} ${request.lastName}`}</p>
                </a>
            <span className="unfriend-button-span"><FriendRequestAcceptOrDenyButtons user={request}/></span>
        </div>    
    )
}

export default YourSingleFriendRequest;