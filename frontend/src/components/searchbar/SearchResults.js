import React from "react";
// import {FaSearch} from "react-icons/fa"
import './SearchResults.css'

export const SearchResultsList = ({results}) => {
        return (
            <div className='results-list'>
                {results.map((result, id) => {
                    return <div key={id}>{result.name}</div>;
                })
                }
            </div>)
            
    }