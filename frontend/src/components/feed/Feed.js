import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import Trending from '../utility/Trending';
// Feed Page
const Feed = ({ navigate }) => {

  // =========== STATE VARIABLES =========================
  const [posts, setPosts] = useState([]); //all posts
  const [token, setToken] = useState(window.localStorage.getItem("token")); //similar to session id
  const [displayPosts, setDispalyPosts] = useState([])
  const [trendingPosts, setTrendingPosts] = useState(null)
  const trend = new Trending()

  // =========== GET ALL POSTS WHEN THE COMPONENT MOUNTS =========================
  useEffect(() => {
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

          // Sort posts based on date_posted in descending order
          const sortedPosts = data.posts.sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));
          setDispalyPosts(sortedPosts)
          setPosts(sortedPosts);
          

         
          // Updates posts with all posts retrieved in descending order
          
          
        })
    }
  }, [])

  // =========== FUNCTION TO HANDLE USER LOGOUT: =========================
 
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  const handleSubmit = () =>{
    const trendyPosts = posts.sort((a, b) => trend.getTrendingResult(b) - trend.getTrendingResult(a));
    setTrendingPosts(trendyPosts)
    trendingPosts.map((post) =>{
      console.log(trend.getCommentStreak(post), trend.getTimeDiff(post), 'time', trend.getCommentStreak(post))
    })
  }
  const handleNewPosts = () =>{
    window.location.reload();
  }
  
 
  // ========================= JSX FOR THE UI OF THE COMPONENT =================================
  // currently shows 'Posts' header, a logout button and a feed of posts
  // see ../post/Post for formatting

  if (token) { // if user is logged in
    return (
      <>
        <p className='subtitles' id='welcome-to-acebook' >Newsfeed</p>
        <button id="Trend" onClick={handleSubmit}>trending</button>
        <button id="New" onClick={handleNewPosts}>new</button>
        <div id='feed' role="feed">
       
          {displayPosts.map(
            (post) => (<Post post={post} key={post._id}  />) // <======= 
          )}
        </div>
      </>
    );
  } else { // else re-direct to '/login'
    navigate('/login');
  }

};
export default Feed;
