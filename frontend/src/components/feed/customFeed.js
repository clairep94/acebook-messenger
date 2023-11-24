import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

// Feed Page
const CustomFeed = (props) => {

  // =========== STATE VARIABLES =========================
  const [posts, setPosts] = useState([]); //all posts
  const [token, setToken] = useState(window.localStorage.getItem("token")); //similar to session id
  

  // =========== GET ALL POSTS WHEN THE COMPONENT MOUNTS =========================
  useEffect((event) => {
    // Checking if token exists (aka user is logged in)
    if (token) {
      // Sends GET request to '/posts' with the auth token
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}` // <======= BODY OF REQUEST
          //Use for all GET requests that require login
        }
      })
        .then(response => response.json())
        .then(async data => {
          console.log(data.posts); // Log to check the structure of the post data
          // Updates to a new token when the GET request is complete
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          console.log('id', props.userId)

          // Sort posts based on date_posted in descending order
          const customPosts = data.posts.filter(post => post.user_id._id === props.userId)
          
          // Updates posts with all posts retrieved in descending order
          setPosts(customPosts);
          customPosts.map((post) => {console.log('post', post)}) 
        })
    }
  }, [])

  // =========== FUNCTION TO HANDLE USER LOGOUT: =========================
  const logout = () => {
    window.localStorage.removeItem("token")
    props.navigate('/login')
  }

  // ========================= JSX FOR THE UI OF THE COMPONENT =================================
  // currently shows 'Posts' header, a logout button and a feed of posts
  // see ../post/Post for formatting

  if (token) { // if user is logged in
    return (
      <>
        <p className='subtitles' id='welcome-to-acebook'>
        {props.firstName} {props.lastName ? `${props.lastName}'s Posts` : ''}
        </p>
        <div id='feed' role="feed">
          {posts.map(
            (post) => (<Post post={post} key={post._id} />) // <======= 
          )}
        </div>
      </>
    );
  } else { // else re-direct to '/login'
    props.navigate('/login');
  }

};
export default CustomFeed;
