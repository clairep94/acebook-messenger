const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

// Routes the HTTP request type with the API endpoint + ModelController.Method
router.get("/", CommentsController.Index);
router.post("/", CommentsController.Create);
router.put("/:id", CommentsController.Like);
router.get("/:id", CommentsController.FindByID);
module.exports = router;