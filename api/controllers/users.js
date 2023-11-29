const { json } = require("express");
const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const UsersController = {

  // CREATE NEW USER -- DOES NOT CHECK TOKEN ===========
  Create: (req, res) => {
    const user = new User(req.body);

    user.save((err) => {
      //checks for any error
      //TODO add to this, it is not taking the error messages specified in the schema.
      if (err) {
        // checks for the specific error code for a duplicate unique key
        // changes the message acordingly we can use this to catch other errors if needed
        if(err.code === 11000){
          return res.status(400).json({message: 'This email is already registered with an account'})
        }
        return res.status(400).json({ message: 'Bad request' });
      }
      else {
        res.status(201).json({ message: 'OK' });
        
      }
    });
  },


  // GET ALL USERS FROM DB ===============
  Index: (req, res) => {
    User.find()
    .exec((err, users) => {
      if(err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({users: users, token: token})
    });
  
  },

  // GET SINGLE USER BY ID ===============
  Find: (req, res) => {
    User.findById(req.user_id)
    // this populates the page with everything but the password
    // i copied claires code, i didnt think i needed to but if i get rid of it everything breaks!
    .populate('user_id', '-password')
    .populate('friends', '-password')
    .populate('requests', '-password')
    .exec((err, users) => {
      if (err) {
        throw err;
      }
      // genrates new token for authentication
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ user: users, token: token });
    });
  },
  FindUser: (req, res) => {
    // this function does the same thing as the find function but it takes the id from the params
    // not the token
    User.findById(req.params.id)
    .populate('user_id', '-password')
    .populate('friends', '-password')
    .populate('requests', '-password')
    .exec((err, users) => {
      if (err) {
        throw err;
      }
      // genrates new token for authentication
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ user: users, token: token });
    });
  },


  // ============= FRIEND FEATURE ===================
  // ----------- FRIEND REQUEST ---------------------
  // checking if a friend request has already been sent happens in the frontend, rather than the backend (vs with Likes in the backend)
  SendFriendRequest: async (req, res) => {
    try {
      const sessionUser = req.user_id;
      const targetUser = req.params.id;
      const updatedUser = await User.findOneAndUpdate(
        {_id: targetUser},
        { $push: { requests: sessionUser } },
        { new: true }
      );
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'Successful Friend Request Send in User Controllers', token, updatedUser });
  
    } catch (err) {
      console.log('Error in User Controllers - Friend Request:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  UnsendFriendRequest: async (req, res) => {
    try {
      const sessionUser = req.user_id;
      const targetUser = req.params.id;
      const updatedUser = await User.findOneAndUpdate(
        {_id: targetUser},
        { $pull: { requests: sessionUser } },
        { new: true }
      );
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'Successful Friend Request Unsend in User Controllers', token, updatedUser });
  
    } catch (err) {
      console.log('Error in User Controllers - Friend Request:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // ----------- CONFIRM/DENY FRIEND REQUEST & DELETE FRIEND ---------------------
  // checking if a friend is already added happens in the frontend.

  AcceptFriendRequest: async (req, res) => {
    // add targetUser to sessionUser's friends list
    // add sessionUser to targetUser's friends list
    // delete targetUser from sessionUser's requests list.
    try {
      const sessionUser = req.user_id;
      const targetUser = req.params.id;

      // add targetUser to sessionUser's friends list & delete targetUser from sessionUser's requests list
      const updatedSessionUser = await User.findOneAndUpdate(
        {_id: sessionUser},
        { $push: { friends: targetUser },
          $pull: { requests: targetUser }
        },
        { new: true }
      );
      
      // add sessionUser to targetUser's friends list
      const updatedUser = await User.findOneAndUpdate(
        {_id: targetUser},
        { $push: { friends: sessionUser} },
        { new: true }
      )

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'Successful Friend Added in User Controllers', token, updatedUser });
  
    } catch (err) {
      console.log('Error in User Controllers - Friend Confirm:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  DenyFriendRequest: async (req, res) => {
    // delete targetUser from sessionUser's requests list.
    try {
      const sessionUser = req.user_id;
      const targetUser = req.params.id;
      const updatedSessionUser = await User.findOneAndUpdate(
        {_id: sessionUser},
        { $pull: { requests: targetUser } },
        { new: true }
      );
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'Successful Friend Request Deleted in User Controllers', token, updatedSessionUser });

    } catch (err) {
      console.log('Error in User Controllers - Friend Deny:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },


  UnFriend: async (req, res) => {
    // delete targetUser from sessionUser's friends list
    // delete sessionUser from targetUser's friends list
    try {
      const sessionUser = req.user_id;
      const targetUser = req.params.id;

      // delete sessionUser from targetUser's friends list
      const updatedSessionUser = await User.findOneAndUpdate(
        {_id: targetSessionUser},
        { $pull: { friends: targetUser } },
        { new: true }
      );
      
      // delete sessionUser from targetUser's friends list
      const updatedUser = await User.findOneAndUpdate(
        {_id: targetUser},
        { $pull: { friends: sessionUser } },
        { new: true }
      );

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'Successful Friend Deleted in User Controllers', token, updatedUser });
      res.status(201).json({ message: 'Successful Friend Deleted in User Controllers', token, updatedTarget });

  
    } catch (err) {
      console.log('Error in User Controllers - Friend Delete:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },





  
  
  
  // ============= UPDATE PROFILE FEATURE @Ben ======================
  // curently only updates the bio but it should be possible to modify it
  // to update other things eg display name
  UpdateProfile: (req, res) => {

    
    if(req.body.type === "bioSub"){
      User.updateOne(
        { _id: req.user_id },
        { $set: { bio: req.body.bio } })
        .exec((err) => {
          if (err) {
            throw err;
          }
          // genrates new token for authentication
          const token = TokenGenerator.jsonwebtoken(req.user_id)
          // 200 status used for put requests
          res.status(200).json({ message: "bio", token: token });
        }); 

    }
    else if(req.body.type === "firstName"){
   
    User.updateOne(
      { _id: req.user_id },
      { $set: { firstName: req.body.firstName } })
     // listens out for errors 
    .exec((err) => {
      if (err) {
        throw err;
      }
      // genrates new token for authentication
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      // 200 status used for put requests
      res.status(200).json({ message: "name", token: token });
    });
  } else if(req.body.type === "lastName"){
    
    User.updateOne(
      { _id: req.user_id },
      { $set: { lastName: req.body.lastName } })
      
     // listens out for errors 
    .exec((err) => {
      if (err) {
        throw err;
      }
      // genrates new token for authentication
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      // 200 status used for put requests
      res.status(200).json({ message: "name", token: token });
    });
  
  
  
};

  }

}

module.exports = UsersController;
