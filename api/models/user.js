const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  bio: { type: String },
  displayName: {type: String},
  profilePictureURL: {
  type: String
}
});
// added new values: 
// bio 
// display name 
// image url (curently not in use)

const User = mongoose.model("User", UserSchema);

module.exports = User;



