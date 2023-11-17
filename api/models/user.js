const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  bio: { type: String },
  displayName: {type: String},
});
// added new values: 
//bio 
//display name (curently not in use)

const User = mongoose.model("User", UserSchema);

module.exports = User;
