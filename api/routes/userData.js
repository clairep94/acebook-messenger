const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");

/* new routes for user data that requires token use
 at the moment it connects to the users controller
 which may be bad practice, it might be an idea to
 make a seperate controller in a differnt file?
*/
router.put("/", UsersController.UpdateBio);
router.get("/", UsersController.Find);


module.exports = router;