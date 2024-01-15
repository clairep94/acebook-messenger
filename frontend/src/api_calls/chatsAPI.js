// This is a page of API calls to the Chats Model Collection

// example useage:
/* 
Chats.jsx:
import { fetchChats, addChat, ... } from '../api_calls/chatsAPI';

useEffect(() => {
    if (token) {
        fetchChats(token)
        .then((chatsData) => {
            setChats(chatsData);
            window.local... //TOKEN GEN
            // SET NEW TOKEN
        });
        .catch((err) => {
            // handle error
        });
    }
}, []);
*/

const API_Endpoint = '/chats'; //full endpoint is localhost:8080/chats

// Load all the conversations where SessionUser is a member (ChatsController.UserInbox)
// Returns a list of chat documents with members.populate
const fetchChats = async (token, sessionUserID) => { //TESTED AND IN-USE
    try {
        const response = await fetch(`${API_Endpoint}/${sessionUserID}`, {
            headers: {
                'Authorization': `Bearer ${token}` 
                }
        })

        const chatsData = await response.json();
        return chatsData;

    } catch (error) {
        console.error('Error fetching chats:', error);
        throw error;
    }
};


// Create a chat with a new user:
// Create chatPayload is created in the component so it can be reused for socket.
const createChat = async (token, createChatPayload) => { // NOT YET USED
    try {
        const response = await fetch (`${API_Endpoint}/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(createChatPayload),
            // payload should be the following format:
            // const createChatPayload = {
            //             senderID: sessionUserID,
            //             receiverID: receiverID
            //         }
        });

        const newChatData = await response.json();
        return newChatData;

    } catch (error) {
        console.error('Error creating chat:', error);
        throw error;
    }
}


// Load the particular Chat between SessionUser and another member:
// Return a single chat document
const findChat = async (token, sessionUserID, conversationPartnerID) => { // NOT YET USED
    try {
        const response = await fetch(`${API_Endpoint}/find/${sessionUserID}/${conversationPartnerID}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                },
        })

        const chatData = await response.json();
        return chatData;
        
    } catch (error) {
        console.error('Error fetching chat:', error);
        throw error;
    }
}

export { fetchChats, findChat, createChat };