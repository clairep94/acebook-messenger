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
// router.get("/", UsersController.Find);
router.get("/:id", UsersController.FindUser);
router.get("/", UsersController.Index);


router.put("/:id/requests/send", UsersController.SendFriendRequest);
router.put("/:id/requests/unsend", UsersController.UnsendFriendRequest);

router.put("/friend_requests/:id/deny", UsersController.DenyFriendRequest);
router.put("/friend_request/:id/accept", UsersController.AcceptFriendRequest);

router.put("/friends/:id/unfriend", UsersController.UnFriend);

// router.put("/:id/friends/new", UsersController.AddFriend);
// router.put("/:id/friends/delete", UsersController.DeleteFriend);

module.exports = router;