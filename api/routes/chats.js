const express = require("express");
const router = express.Router();

const ChatsController = require("../controllers/chats")


router.post("/", ChatsController.Create); // Create a new chat between two members
router.get("/:userID", ChatsController.UserInbox); // Find all chats of which one user is a member
router.get("/find/:firstID/:secondID", ChatsController.FindChat); // Find the single chat between two members


module.exports = router;