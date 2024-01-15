// This is a page of API calls to the Messages Model Collection

const API_Endpoint = '/messages'; //full endpoint is localhost:8080/messages

// Load all messages between SessionUser and another Member, search by chat._id

const fetchMessages = async (token, chat) => {
    try {
        const response = await fetch(`${API_Endpoint}/${chat._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const messagesData = await response.json();
        return messagesData;

    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    };
};


// Send a new message
// sendMessagePayload is created in the component so it can be reused for the socket.
const sendMessage = async (token, sendMessagePayload) => {
    try {
        const response = await fetch(`${API_Endpoint}/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(sendMessagePayload),
        });
        const sentMessageData = await response.json();
        return sentMessageData;

    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}



export { fetchMessages, sendMessage };