const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

// Routes the HTTP request type with the API endpoint + ModelController.Method
router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.put("/:id", PostsController.Like);
router.put("/:id/comment", PostsController.LeaveComment);
router.get("/:id", PostsController.FindByID);
module.exports = router;
