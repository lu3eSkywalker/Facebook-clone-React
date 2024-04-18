const mongoose = require('mongoose');

const FriendRequest = new mongoose.Schema({
    userId: {
        type: String
    },

    tobefriendId: {
        type: String
    },

    status: {
        type: String
    }
})


module.exports = mongoose.model("FriendRequest", FriendRequest)