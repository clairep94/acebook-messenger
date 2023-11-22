import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar/navbar";

import LogInForm from '../components/auth/LoginForm';
import '../pages/stylesheets/style.css';

const LoginPage = ({navigate}) => {


    return (
        <>
        <Navbar />
        <p className='subtitles'>LOG IN</p>
        <LogInForm navigate={navigate} />
        </>
    )
}

export default LoginPage;