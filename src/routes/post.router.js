const express = require("express");
const {createPost, getAllPost, updatePost, deletePost, getPostByLatLong, getActiveInActivePosts, getPostById} = require("../controller/post.controller")
const passport = require("../middleware/auth.middleware");
const postRouter = express.Router();

//Add Post
postRouter.post("/add", passport.authenticate('jwt', { session: false }), createPost);

//get all posts of user
postRouter.get("/get-all",passport.authenticate('jwt', { session: false }), getAllPost);

//get all posts of user
postRouter.get("/get-post-by-id/:postId",passport.authenticate('jwt', { session: false }), getPostById);

//modify the post
postRouter.put("/update/:postId",passport.authenticate('jwt', { session: false }), updatePost);

//delete the post
postRouter.delete("/delete/:postId",passport.authenticate('jwt', { session: false }), deletePost);

//get post by lat-long co-ordinates
postRouter.post("/get-post-by-coords",passport.authenticate('jwt', { session: false }), getPostByLatLong);

//Get count of active - inactive posts
postRouter.get("/get-active-inactive",passport.authenticate('jwt', { session: false }), getActiveInActivePosts);

module.exports = postRouter;