const express = require("express");
const {register, login} = require("../controller/user.controller");

const userRouter = express.Router();

//Register User
userRouter.post("/register", register)

// Login User
userRouter.post("/login",login)

module.exports = userRouter;