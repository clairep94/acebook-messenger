const { json } = require("express");
const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const UsersController = {
 
// finds a single user by id
  Find: (req, res) => {
    User.findById(req.user_id)
    // this populates the page with everything but the password
    // i copied claires code, i didnt think i needed to but if i get rid of it everything breaks!
    .populate('user_id', '-password')
    .exec((err, users) => {
      if (err) {
        throw err;
      }
      // genrates new token for authentication
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ user: users, token: token });
    });
  
  },
 
  
  
  Create: (req, res) => {
    const user = new User(req.body);

    user.save((err) => {
      //checks for any error
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
  // curently only updates the bio but it should be possible to modify it
  // to update other things eg display name
  UpdateBio: (req, res) => {
    console.log(`id? ${req.user_id}`)
    User.updateOne(
      { _id: req.user_id },
      { $set: { bio: req.body.bio } })

     // listens out for errors
    .exec((err) => {
      if (err) {
        throw err;
      }
      // genrates new token for authentication
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      // 200 status used for put requests
      res.status(200).json({ message: "bio", token: token });
    });
   
  },
};




module.exports = UsersController;
/*
testUser.updateOne(
  { _id: testUser.userId },
  { $set: { bio: "do a test" } }
);
*/