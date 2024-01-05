const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, required : [true, "title is required!"]  },
    body: { type: String, required : [true, "body is required!"]  },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    active: { type: Boolean, default: true },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
  });

module.exports = mongoose.model("Post", postSchema)