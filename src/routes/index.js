const express = require("express");
const userRouter = require("./user.router");
const postRouter = require("./post.router");

const router = express.Router();

router.use("/user",userRouter)
router.use("/post",postRouter)

module.exports = router;