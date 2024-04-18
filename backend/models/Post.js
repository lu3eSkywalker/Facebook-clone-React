const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },

    originalName: {
        type: String,
    },

    cloudinaryUrl: {
        type: String,
    },

    like: [{
        type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: "Like"
    }],

    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: "Comment"
    }]


});

const Post = mongoose.model("Post", postSchema);

module.exports = Post
