const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    email : {
        type: String,
        required : [true, "email is required!"] 
    },
    password : {
        type: String,
        required :  [true, "password is required!"] 
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
},{
    timestamps : true
});

module.exports = mongoose.model("User", userSchema)