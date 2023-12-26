import React, { useState } from 'react';
import './ChatSearchBar.css'; 
import {FaSearch} from "react-icons/fa"

const ChatSearchBar = ({setChatSearchResults, token, setToken}) => {
    const [input, setInput] = useState("");


    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your search logic here
      console.log('Search submitted!');
    };

    // =========== GET ALL USERS AS CLIENT TYPES INTO SEARCH BAR =========================
    const fetchData = (value) => {
      // Sends GET request to '/users' with the auth token
      fetch("/userData", {
        headers: {
          'Authorization': `Bearer ${token}`
        }})
      .then((response)=>response.json())
      .then(async data => {
        // Updates to a new token when the GET request is complete
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        console.log(data)

        const results = data.users.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`
          return (
            value && //if user has not left the search field blank
            user && //user exists in the api
            // user.fullName && //user has a full name in the api
            fullName.toLowerCase().includes(value.toLowerCase()) //search value is partially included in the user.fullName
          );
        });
        console.log(results);
        setChatSearchResults(results);
      });
    };
      
    // Calls fetchData as the client is typing
    const handleChange = (value) => {
      setInput(value);
      fetchData(value);
    }

    // ========================= JSX FOR THE UI OF THE COMPONENT =================================
    return (
      <form className="chat-search-bar" onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="chat-search-field" 
          placeholder="Search for a Chat..."
          value={input}
          onChange={(e) => handleChange(e.target.value)} 
        />
        <button type="submit"><FaSearch id="search-icon" color='white'></FaSearch></button>
      </form>
    );
  };

export default ChatSearchBar;
