const mongoose = require('mongoose');

const Signup = new mongoose.Schema({
    name: {
        type: String,
    },

    email: {
        type: String,
    },

    profilePicture: [{
        type: String,
    }],

    password: {
        type: String,
    },

    post: [{
        type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: "Post"
    }],

    friends: [{
        type: String,
        ref: "Friends"
    }]

})

module.exports = mongoose.model("Signup", Signup)