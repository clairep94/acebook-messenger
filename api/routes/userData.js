const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");

/* new routes for user data that requires token use
 at the moment it connects to the users controller
 which may be bad practice, it might be an idea to
 make a seperate controller in a differnt file?
 chaged name to update profile
*/
router.put("/", UsersController.UpdateProfile);
router.get("/", UsersController.Find);
router.get("/:id", UsersController.FindUser);

module.exports = router;