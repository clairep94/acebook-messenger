const express = require("express");
const router = express.Router();

const MessagesController = require("../controllers/messages")


router.post("/", MessagesController.AddMessage);
router.get("/:chatID", MessagesController.GetMessages);

module.exports = router;