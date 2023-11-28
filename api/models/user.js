// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   firstName: {type: String}, //TODO required = true -> error messages
//   lastName: {type: String}, //TODO required = true -> error messages
//   fullName: {type: String},
//   email: { type: String, required: true, unique: true},
//   password: { type: String, required: true },
//   bio: { type: String },
//   displayName: {type: String},
//   profilePictureURL: {type: String}
// });
// // added new values: 
// // bio 
// // display name 
// // image url (curently not in use)

// const User = mongoose.model("User", UserSchema);

// module.exports = User;



const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required.']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.']
  },
  fullName: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: [true, 'Email must be unique.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  },
  bio: { type: String },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/dexcxd3xi/image/upload/v1700761470/stock-illustration-male-avatar-profile-picture-use_bxlg4g.jpg',
  },
});

// // Define a virtual property for fullName
// UserSchema.virtual('fullName').get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });

// Optionally, set the 'toObject' option to include virtuals when converting to JSON
UserSchema.set('toObject', { virtuals: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
