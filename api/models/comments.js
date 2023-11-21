const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  
  message: String,
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  date_posted: { type: Date },
  likes: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: 'User' },
  replies: {type:[mongoose.Schema.Types.ObjectId], default: [], ref: 'Comment' },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;