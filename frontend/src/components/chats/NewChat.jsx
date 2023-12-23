import React, { useEffect, useState } from 'react';
import getSessionUserID from '../utility/getSessionUserID';
import useFetchUserDataByID from '../utility/getselectuserinfo';
import { response } from '../../../../api/app';


const NewChatForm = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    let sessionUserID = getSessionUserID(token);
    let recipientID = "65666ce40ff64513c88918de";


    const chatPayload = {
        senderID: sessionUserID,
        receiverID: recipientID
    }

    const createChat = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/chats', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(chatPayload)
            })

            if (response.status === 201) {
            const data = await response.json();
            const newChatID = data.chat._id;

            } else {
                console.log("error")
            }
        } catch (error) {
            console.error(`Error creating new chat:`, error);
        }

    }
}

export default NewChatForm;
