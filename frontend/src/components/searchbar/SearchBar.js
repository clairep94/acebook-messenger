import React, { useState } from 'react';
import './SearchBar.css'; // You can create this CSS file for styling if needed
import {FaSearch} from "react-icons/fa"

const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your search logic here
      console.log('Search submitted!');
    };


    const fetchData = (value) => {
      fetch("https://jsonplaceholder.typicode.com/users") //TODO change this to our API
      .then((response)=>response.json())
      .then((json)=> {
        const results = json.filter((user) => { //TODO change this to filter in backend?
          return (
            value && //if user has not left the search field blank
            user && //user exists in the api
            user.name && //user in the api has a name
            user.name.toLowerCase().includes(value.toLowerCase()) //user's name in lowercase includes the user's search in lowercase
            );
        });
        console.log(results);
        setResults(results);

      });
    }
  
    const handleChange = (value) => {
      setInput(value);
      fetchData(value); // call fetchData as you are typing
    }

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