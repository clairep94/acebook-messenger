// Following: https://www.youtube.com/watch?v=SDMs2Pq6w90

const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    chat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
    }
},
    {
        timestamps: true, // USE THIS --> auto adds doc.createdAt, doc.updatedAt properties
    }
);


const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;