import React from "react";
// import {FaSearch} from "react-icons/fa"
import './ChatSearchResultsList.css'
import { ChatSearchResult } from "./ChatSearchResult";


const ChatSearchResultsList = ({chatSearchResults}) => {
    const results = chatSearchResults;
        return (

            <div className="chat-search-results-list">
                {results.map ((result,id) => {
                    return <ChatSearchResult result={result} key={id}/>
                })}
            </div>
        );
            
    }

export default ChatSearchResultsList