// Following: https://www.youtube.com/watch?v=SDMs2Pq6w90

const mongoose = require("mongoose");


const ChatSchema = new mongoose.Schema({
    members: {
        // type: Array,
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
},
    {
        timestamps: true, // USE THIS --> auto adds doc.createdAt, doc.updatedAt properties
    }
);


const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;