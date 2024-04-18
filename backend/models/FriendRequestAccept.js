const mongoose = require('mongoose');

const FriendRequestAccept = new mongoose.Schema({
    tobefriendId: {
        type: String
    },

    requestId: {
        type: String
    },

    status: {
        type: String
    },

    userId: {
        type: String
    }
})

module.exports = mongoose.model("FriendRequestAccept", FriendRequestAccept)