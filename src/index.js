const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config()

const routes = require("./routes");
const passport = require('./middleware/auth.middleware')

mongoose.connect(process.env.MONGODB_URL);
const connection = mongoose.connection;

connection.on("error", (error) => console.log("Error while connecting mongoose.", error))
connection.once("open", ()=> console.log("Connected with MongoDB"))

const app = express();
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use("/api",routes)

app.get("/",(req ,res) => {
    return res.status(200).json({message : "Welcome to Server !!"})
})

app.listen(process.env.PORT || 8080, () =>{
    console.log("Server Started!!")
})