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
import Welcome from '../../pages/welcome'
import UploadImage from '../upload_image/UploadImage';
import LoginPage from '../../pages/loginPage';
import SignedOutUserPage from '../ProfilePage/SignedOutUserPage';
import CustomFeed from '../feed/customFeed';
import YourFriendsListPage from '../../pages/yourFriendsListPage';
import YourFriendRequestsPage from '../../pages/yourFriendRequestsPage';

const App = () => {
  // Routes for each page of the website
  return (

    <Routes>
      <Route path='/' element={<Welcome navigate={useNavigate()} />} />
      <Route path='/users/:userId' element={<SignedOutUserPage navigate={ useNavigate() }/>} />
      <Route path='/posts' element={<Feed navigate={useNavigate()} />} />
      <Route path='/login' element={<LoginPage navigate={useNavigate()} />} />
      <Route path='/custompost' element={<CustomFeed navigate={useNavigate()} />} />

      {/* <Route path='/login' element={<LoginForm navigate={useNavigate()} />} /> */}
      <Route path='/signup' element={<SignUpForm navigate={useNavigate()} />} />
      <Route path='/new_post' element={<NewPostForm navigate={useNavigate()} />} />
      <Route path='/countdown' element={<Countdown navigate={useNavigate()} />} />
      <Route path='/timeline' element={<Index navigate={useNavigate()} />} />
      <Route path='/profile' element={<ProfilePage navigate={useNavigate()} />} />
      <Route path='/updateprofile' element={<UpdatePage navigate={useNavigate()} />} />
      <Route path='/upload_image' element={<UploadImage navigate={useNavigate()} />} />
      <Route path='/your_friends' element={<YourFriendsListPage navigate={useNavigate()}/>}/>
      <Route path='/your_friend_requests' element={<YourFriendRequestsPage navigate={useNavigate()}/>}/>




    </Routes>
  );
}

export default App;
