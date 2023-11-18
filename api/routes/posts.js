const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

// Routes the HTTP request type with the API endpoint + ModelController.Method
router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.put("/:id", PostsController.Like);

module.exports = router;
