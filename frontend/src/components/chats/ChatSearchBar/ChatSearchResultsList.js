import React from "react";
// import {FaSearch} from "react-icons/fa"
import './ChatSearchResultsList.css'
import { ChatSearchResult } from "./ChatSearchResult";


const ChatSearchResultsList = ({chatSearchResults, token, setToken, sessionUserID,
                                chats, setChats, setCurrentChat, setSendNewConversation
                                }) => {
    const results = chatSearchResults;
        return (
            <div className="chat-search-results-list">
                {results.map ((result,id) => {
                    return <ChatSearchResult result={result} key={id}
                    token={token} setToken={setToken} sessionUserID={sessionUserID}
                    chats={chats} setChats={setChats} setCurrentChat={setCurrentChat}
                    setSendNewConversation={setSendNewConversation}
                    />
                })}
            </div>
        );
            
    }

export default ChatSearchResultsList