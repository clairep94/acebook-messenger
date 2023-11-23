import React, { useState } from 'react';
import './SearchBar.css'; 
import {FaSearch} from "react-icons/fa"

const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token")); 


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
        setResults(results);
      });
    };
      
    // Calls fetchData as the client is typing
    const handleChange = (value) => {
      setInput(value);
      fetchData(value);
    }

    // ========================= JSX FOR THE UI OF THE COMPONENT =================================
    return (
      <form className="search-bar" onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="search-field" 
          placeholder="Search Acebook..."
          value={input}
          onChange={(e) => handleChange(e.target.value)} 
        />
        <button type="submit"><FaSearch id="search-icon" color='white'></FaSearch></button>
      </form>
    );
  };

export default SearchBar;
