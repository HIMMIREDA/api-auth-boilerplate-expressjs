const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postControllers/postController.js");

router.route("/")
  .get(postController.getPosts)
  .post(postController.addPost);

router.route("/:id(\d+)")
  .get(postController.getPost)
  .delete(postController.deletePost)
  .put(postController.updatePost);



module.exports = router;


