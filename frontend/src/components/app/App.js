import './App.css';
import LoginForm from '../auth/LoginForm'
import ProfilePage from '../ProfilePage/ProfilePage';
import SignUpForm from '../user/SignUpForm'
import NewPostForm from '../post_create/NewPostForm';
import UpdatePage from '../ProfilePage/updatePage';
import React, { useState } from 'react';
import Feed from '../feed/Feed';
import { useNavigate, Routes, Route, } from "react-router-dom";
import Countdown from '../countdown/countdown';
import Index from '../../pages/timeline';
import UserProfile from '../../pages/otherProfilepage'
import Welcome from '../../pages/welcome'
import NewCommentForm from '../CommentWrite/CommentWrite';

const App = () => {
const HardCodePost = {_id:'655b68ed136a2e417f658595'}
  // Routes for each page of the website
  return (
        <Routes>
          <Route path='/' element={<Welcome navigate={ useNavigate() }/>}/>
          <Route path='/user/:userId' element={<UserProfile navigate={ useNavigate() }/>} />
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/new_post' element={<NewPostForm navigate={ useNavigate() }/>}/>
          <Route path='/countdown' element={<Countdown navigate={ useNavigate() }/>}/>
          <Route path='/timeline' element={<Index navigate={ useNavigate() }/>}/>
          <Route path='/profile' element={<ProfilePage navigate={ useNavigate() }/>}/>
          <Route path='/updateprofile' element={<UpdatePage navigate={ useNavigate() }/>}/>
          <Route path='/newcomment' element={<NewCommentForm currentPost={HardCodePost} navigate={ useNavigate() }/>}/>

          
        </Routes>
    );
}

export default App;
