import React from "react";
import LogInForm from "./LoginForm";
import './LoginPopup.css';

const LoginPopup = ({ navigate, onClose }) => {
    return (
        <div className='login-popup'>
            <div className='login-popup-content'>
            <span className='close' onClick={onClose}>
                &times;
            </span>
            <h2>Login</h2>
            <LogInForm navigate={navigate} />
            </div>
        </div>
        );
    };
    
export default LoginPopup;