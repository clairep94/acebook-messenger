import React from "react";
import UpdatePage from "./updatePage";

const UpdateProfilePopUp = ({ navigate, onClose}) => {
    return (
        <div className='login-popup'>
            <div className='login-popup-content'>
            <span className='close' onClick={onClose}>
                &times;
            </span>
            <UpdatePage/>
            </div>
        </div>
        );
    };
    
export default UpdateProfilePopUp;