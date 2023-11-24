import React from "react";
import "./SearchResult.css"


export const SearchResult = ({result}) => {

    return (
    <div className="search-result">
        <a href={`/users/${result._id}`}>
            {/* <img className="profilepic" src={`https://robohash.org/${result._id}.png`}></img> */}
            {`${result.firstName} ${result.lastName}`}
        </a>
    </div>
    )
}