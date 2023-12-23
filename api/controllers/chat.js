// https://www.youtube.com/watch?v=SDMs2Pq6w90

const Chat = require("../models/chat");
const TokenGenerator = require("../lib/token_generator");

const ChatsController = {
    // TODO compare this tutorial with old format, do async here or within FE?
    Create: async (req, res) => {
        const newChat = new Chat({
            members: [req.body.senderID, req.body.receiverID]
        });
        try {
            const result = await newChat.save();
            // const token = TokenGenerator.jsonwebtoken(req.user_id)
            // res.status(201).json({ message: 'Successful New Chat in Chats Controller', token: token, chat: result });
            res.status(201).json({ message: 'Successful New Chat in Chats Controller', chat: result });
            
        } catch (error) {
            console.log('Error in Chat Controller - Create:', error);
            res.status(500).json(error);
        }
    },
    UserInbox: async (req, res) => {
        const userID = req.params.userID;        
        try {
            const chats = await Chat.find({
                members: { $in: [userID] }
            })
            // .populate('members', '-password') // TODO add this? for now follow tutorial
            // const token = TokenGenerator.jsonwebtoken(req.user_id);
            // res.status(201).json({ message: 'Successful Inbox In Chats Controller', token, chats: chats });
            res.status(201).json({ message: 'Successful Inbox In Chats Controller', chats: chats });
            
        } catch (error) {
            console.log('Error in Chat Controller - UserInbox:', error);
            res.status(500).json(error);
        }
    },
    FindChat: async (req, res) => {
        const firstUserID = req.params.firstID;
        const secondUserID = req.params.secondID;
                try {
            const chat = await Chat.findOne({
                members: { $all: [firstUserID, secondUserID] } // TODO this was in the tutorial, but this requires match in order of array.
                // $all: [ // changed to this to not be in order.
                //     { $elemMatch: { $eq: firstUserID } },
                //     { $elemMatch: { $eq: secondUserID } }
                //     ]
            })
            // .populate('members', '-password') // TODO add this? for now follow tutorial
            // const token = TokenGenerator.jsonwebtoken(req.user_id);
            // res.status(201).json({ message: 'Successful Chat Found In Chats Controller', token, chat: chat });
            res.status(201).json({ message: 'Successful Chat Found In Chats Controller', chat: chat });
            
        } catch (error) {
            console.log('Error in Chat Controller - FindChat:', error);
            res.status(500).json(error);
        }
    },

s
}

module.exports = ChatsController;