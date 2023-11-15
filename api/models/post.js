const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date_posted: {
    type: Date
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'User'
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
