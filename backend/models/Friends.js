const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    userId: {
        type: String,
    },

    friendId: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref: "Signup"
    }
});

module.exports = mongoose.model("Friends", friendsSchema)