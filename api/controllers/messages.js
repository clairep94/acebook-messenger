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
            author: req.body.authorID,
            body: req.body.body
        });
        try {
            const result = await newMessage.save()
            // .populate('author', '-password');
            const token = TokenGenerator.jsonwebtoken(req.user_id) 
            res.status(201).json({ message: 'Successful New Message in Messages Controller', token:token, newMessage: result });
            // res.status(201).json({ message: 'Successful New Message in Messages Controller', newMessage: result });

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
            )
            .populate('author', '-password')
            const token = TokenGenerator.jsonwebtoken(req.user_id) 
            res.status(201).json({ message: 'Successful All Messages in Messages Controller', allMessages: messages, token: token }); 

        } catch (error) {
            console.log('Error in Message Controller - GetMessages:', error);
            res.status(500).json(error);
        }
    }

}

module.exports = MessagesController