const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    userId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Like", likeSchema);