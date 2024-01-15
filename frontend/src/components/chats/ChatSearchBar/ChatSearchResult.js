import React from "react";
import "./ChatSearchResult.css"
import { createChat } from "../../../api_calls/chatsAPI";

export const ChatSearchResult = ({result, id, 
                                token, setToken, sessionUserID,
                                chats, setChats, // check if the result._id is a member of current chats. If not, create a new chat. If yes, setCurrentChat
                                setCurrentChat,
                                setSendNewConversation
                                }) => {

    const targetID = result._id;

    // Check if a target in a member of a chat: -> returns bool
    const isTargetUserInChat = (chat) => {
        return chat.members.some(member => member._id === targetID);
    }

    // Check if the target user is already talking to the sessionUser: -> returns bool
    const alreadyTalking = () => {
        return chats.some(chat => isTargetUserInChat(chat));
    }

    // Get the existing chat and setCurrentChat, use if alreadyTalking is true:
    const setExistingChat = () => {
        const existingChat = chats.find(chat => isTargetUserInChat(chat));
        setCurrentChat(existingChat);
    }

    // Create a new chat, use if alreadyTalking is not true:
    const createNewChat = async (event) => {
        console.log("create a new chat")
        // event.preventDefault();

        const newChatPayload = {
            senderID: sessionUserID,
            receiverID: targetID
        }

        if (token) {
            createChat(token, newChatPayload)
            .then(newChatData => {
                window.localStorage.setItem("token", newChatData.token)
                setToken(window.localStorage.getItem("token"))

                // add newChat to the chats array:
                setChats([...chats, newChatData.chat])

                // set newChat to the current chat:
                console.log(newChatData.chat)
                setCurrentChat(newChatData.chat)

                // send newChat to the socket server:
                const receiverID = targetID;
                setSendNewConversation({...newChatData.chat, receiverID});
                console.log("send signal to new chat partner")
            })
        }
    }

    // BUTTON CLICK -------------------
    const handleClick = () => {
        if (targetID === sessionUserID) {
            console.log('selected self'); // TODO change this so that you can talk to yourself. change thats to array of non-self chat members. pop out first instance.
        }
        else if (alreadyTalking()){
            setExistingChat()
        }
        else{
            createNewChat()
        }
    }



    return (
    <div className="chat-search-result" key={id} onClick={handleClick}>
        {/* <a href={`/users/${result._id}`}> */}
            {/* <img src={user.avatar} className='smallcirclemask' alt="Image Alt Text" /> */}
            <img className='smallcirclemask' src={`https://picsum.photos/seed/${result._id}/300`}/>
            <span className='who-liked-this-span'>{`${result.firstName} ${result.lastName}`}</span>
        {/* </a> */}
    </div>
    )
}