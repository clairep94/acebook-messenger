import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import TrendingCalculator from '../utility/Trending';
import './Feed.css'

// Feed Page
const Feed = ({ navigate }) => {

  // =========== STATE VARIABLES =========================
  const [posts, setPosts] = useState([]); //all posts
  const [token, setToken] = useState(window.localStorage.getItem("token")); //similar to session id
  const [displayPosts, setDisplayPosts] = useState([])
  const [trendingPosts, setTrendingPosts] = useState(null)
  const [sortByMethod, setSortByMethod] = useState("New (Default)")
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
          setSortByMethod("New (Default)");
        })
    }
  }, [])


  // =========== FUNCTION TO HANDLE POSTS SORTING BY TRENDING VS NEW: =========================

  // Sort by trending
  const handleTrendingPosts = () =>{
    const trendyPosts = posts.sort((a, b) => trendCalc.getTrendingResult(b) - trendCalc.getTrendingResult(a));
    setTrendingPosts(trendyPosts)
    setSortByMethod("Trending");
  }

  // Sort by new -- return to default by re-loading component
  const handleNewPosts = () =>{
    window.location.reload();
  }
  
 
  // ========================= JSX FOR THE UI OF THE COMPONENT =================================

  if (token) { // if user is logged in
    return (
      <>
        <p className='subtitles' id='newsfeed-title' >Newsfeed</p>

        <div className='dropdown'>
          <button class="dropbtn">Sort by: {sortByMethod}</button>
          <div class="dropdown-content">
            <a href="#" onClick={handleNewPosts}>New (Default)</a>
            <a href="#" onClick={handleTrendingPosts}>Trending</a>
          </div>
        </div>


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
