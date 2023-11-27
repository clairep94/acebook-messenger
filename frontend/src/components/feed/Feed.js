import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import TrendingCalculator from '../utility/Trending';

// Feed Page
const Feed = ({ navigate }) => {

  // =========== STATE VARIABLES =========================
  const [posts, setPosts] = useState([]); //all posts
  const [token, setToken] = useState(window.localStorage.getItem("token")); //similar to session id
  const [displayPosts, setDisplayPosts] = useState([])
  const [trendingPosts, setTrendingPosts] = useState(null)
  const trendCalc = new TrendingCalculator()

  // =========== GET ALL POSTS WHEN THE COMPONENT MOUNTS =========================
  useEffect(() => {
    // Checking if token exists (aka user is logged in)
    if (token) {
      // Sends GET request to '/posts' with the auth token
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
        .then(response => response.json())
        .then(async data => {
          // console.log(data.posts);
          // Updates to a new token when the GET request is complete
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))

          // DEFAULT SORTING: by date_posted in descending order
          const sortedPosts = data.posts.sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));
          setDisplayPosts(sortedPosts)
          setPosts(sortedPosts);
        })
    }
  }, [])


  // =========== FUNCTION TO HANDLE POSTS SORTING BY TRENDING VS NEW: =========================

  // Sort by trending
  const handleTrendingPosts = () =>{
    const trendyPosts = posts.sort((a, b) => trendCalc.getTrendingResult(b) - trendCalc.getTrendingResult(a));
    setTrendingPosts(trendyPosts)
    trendingPosts.map((post) =>{
      console.log(trendCalc.getCommentStreak(post), trendCalc.getTimeDiff(post), 'time', trendCalc.getCommentStreak(post))
    })
  }

  // Sort by new -- return to default by re-loading component
  const handleNewPosts = () =>{
    window.location.reload();
  }
  
 
  // ========================= JSX FOR THE UI OF THE COMPONENT =================================

  if (token) { // if user is logged in
    return (
      <>
        <p className='subtitles' id='welcome-to-acebook' >Newsfeed</p>
        <button id="Trend" onClick={handleTrendingPosts}>trending</button>
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
