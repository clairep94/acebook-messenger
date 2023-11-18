const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find()
    .populate('user_id', '-password') // Populate the 'user_id' field with the entire User document
    .populate('likes', '-password')
    .exec((err, posts) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
    
  },
  Create: (req, res) => {
    console.log("controllers/posts.js 15: getting user id:")
    console.log(req.user_id);

    let time_now = Date.now();
    console.log(time_now)

    const post = new Post({
      message: req.body.message, // necessary change from req.body to make this work.
      user_id: req.user_id, // adds the user_id from req to the new Post
      date_posted: time_now // adds the Date object at the time of creation to the new Post
    }); 
    console.log("controllers/posts.js 20: getting post object:")
    console.log(post);

    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
  Like: (req, res) => {
    // get the user_id & post_id:
    console.log("controllers/posts.js 44:")
    const sessionUser = req.user_id;
    const postID = req.params.id;
    console.log(`Getting UserID: ${sessionUser}`)
    console.log(`Getting PostID: ${postID}`)

    Post.findOneAndUpdate(
      {_id: postID },
      {$push: {likes: sessionUser}},
      { new: true },
      (err, updatedPost) => {
        if (err) {
          console.log('Unsuccessful Like in Post Controllers')
          throw err;
        } else {
          console.log('Successful Like in Post Controllers')
          const token = TokenGenerator.jsonwebtoken(req.user_id)
          res.status(201).json({ message: 'Successful Like in Post Controllers', token: token, updatedPost });    
        }
      }
    )
  }
};

module.exports = PostsController;
