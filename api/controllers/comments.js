const Comment = require("../models/comments");
const TokenGenerator = require("../lib/token_generator");

const CommentsController = {
  Index: (req, res) => {
    Comment.find()
    .populate('user_id', '-password') // Populate the 'user_id' field with the entire User document
    .populate('likes', '-password')
    .exec((err, comments) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({comments: comments, token: token });
    });
    
  },
  FindByID: (req, res) => {
    const commentID = req.params.id;
    Comment.findById(commentID)
    .populate('user_id', '-password') // Populate the 'user_id' field with the entire User document
    .populate('likes', '-password')
    .exec((err, comment) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ comment: comment, token: token });
    });

  },
  Create: (req, res) => {
    const sessionUser = req.user_id;
    console.log("controllers/comments.js 33: getting user id:")
    console.log(sessionUser);

    // let time_now = Date.now();
    let time_now = new Date();
    console.log(time_now)

    const comment = new Comment({
      message: req.body.message, // necessary change from req.body to make this work.
      user_id: req.body.author, // adds the user_id from req to the new Post
      date_posted: time_now // adds the Date object at the time of creation to the new Post
    }); 
    console.log("controllers/comments.js 45: getting post object:")
    console.log(comment);

    comment.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id)
    //   This allows you to define a custom response including created ID
      res.status(201).json({ message: 'OK', token: token, commentId: comment._id  });
    });
  },

  Like: async (req, res) => {

    try {
      // get the user_id & post_id:
      const sessionUser = req.user_id;
      const commentID = req._id;
      console.log(`Getting UserID: ${sessionUser}`)
      console.log(`Getting commentID: ${commentID}`)

      // Check if the user is already in the list of users who've liked this:
      const alreadyLiked = await Comment.findOne({
        $and: [
          {_id: commentID},
          {likes: {$in: [sessionUser]}}
        ]
      }); // returns the matching doc or null

      console.log(`checking if already liked: ${alreadyLiked}`)

      // If not already liked, add sessionUser to likes array
      if (!alreadyLiked) {
        const updatedComment = await Comment.findOneAndUpdate(
          { _id: commentID },
          { $push: { likes: sessionUser } },
          { new: true }
        );
        console.log('Successful Like in comment Controllers');
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: 'Successful Like in comment Controllers', token, updatedComment });

      // If already liked, remove sessionUser from likes array
      } else { 
        const updatedCommentPost = await Comment.findOneAndUpdate(
          { _id: commentID },
          { $pull: { likes: sessionUser } },
          { new: true }
        );
        console.log('Successful Unlike in comment Controllers');
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: 'Successful Unlike in comment Controllers', token, updatedComment });
      }

    } catch (err) {
      console.log('Error in comment Controllers:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }

  }
};

module.exports = CommentsController;
