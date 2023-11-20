import React from "react";
import './SuccessfullySignedUpPopup.css';

const SignupSuccessPopup = ({onClick, onClose}) => {

    // const handleTimelineNavigation = () => {
    //     navigate('/timeline');
    //     onClose(); // Close the popup after navigation
    // };

    return (
        <div className="signedup-popup">
            <div className="signedup-popup-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h4>Successfully logged in!</h4>
                <button className='Button' onClick={ onClick }>Go to Login</button>
            </div>
        </div>
    )

}

export default SignupSuccessPopup