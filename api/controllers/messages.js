// https://www.youtube.com/watch?v=SDMs2Pq6w90

const Message = require("../models/message");
const TokenGenerator = require("../lib/token_generator");

// TODO:
// Add back authentication-only here and in app.js
// If no chatID, throw error
// If author not in chat.members, throw error


const MessagesController = {
    AddMessage: async (req, res) => {
        const newMessage = new Message({
            chat_id: req.body.chatID,
            author_id: req.body.authorID,
            body: req.body.body
        });
        try {
            const result = await newMessage.save();
            // const token = TokenGenerator.jsonwebtoken(req.user_id) // TODO change back to Auth Only once all testing is done
            // res.status(201).json({ message: 'Successful New Chat in Chats Controller', token: token, chat: result }); // TODO change back to Auth Only once all testing is done
            res.status(201).json({ message: 'Successful New Message in Messages Controller', newMessage: result });
            
        } catch (error) {
            console.log('Error in Message Controller - AddMessage:', error);
            res.status(500).json(error);
        }
    },
    GetMessages: async (req, res) => {
        const chatID = req.params.chatID;
        try {
            const messages = await Message.find(
                { chat_id: chatID },
            );
            // const token = TokenGenerator.jsonwebtoken(req.user_id) // TODO change back to Auth Only once all testing is done
            // res.status(201).json({ message: 'Successful New Chat in Chats Controller', token: token, chat: result }); // TODO change back to Auth Only once all testing is done
            res.status(201).json({ message: 'Successful All Messages in Messages Controller', allMessages: messages });
            

        } catch (error) {
            console.log('Error in Message Controller - GetMessages:', error);
            res.status(500).json(error);
        }
    }

}

module.exports = MessagesController