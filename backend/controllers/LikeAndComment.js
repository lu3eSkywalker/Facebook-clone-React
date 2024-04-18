const Comment = require("../models/Comment");
const Friends = require("../models/Friends");
const Like = require("../models/Like");
const Post = require("../models/Post");
const Signup = require("../models/Signup");
const mongoose = require('mongoose');



exports.likePost = async(req, res) => {
    try {
        const {postId, userId} = req.body;
        const like = new Like({
            postId, userId
        });
        const savedlike = await like.save();

        const updatedPost = await Post.findByIdAndUpdate(
            postId, {$push: {like: savedlike._id } },
            {new: true}
        );

        res.json({
            post: updatedPost,
        });
    }
    catch(error) {
        console.log("Error: ", error)
    }
}

exports.createComment = async(req, res) => {
    try {
        const {postId, body, userId} = req.body;
        const comment = new Comment({
            postId, body, userId
        });
        const savedcomment = await comment.save();

        const updatedPost = await Post.findByIdAndUpdate(
            postId, {$push: {comment: savedcomment._id } },
            {new: true}
        );

        res.json({
            post: updatedPost
        })
    }
    catch(error) {
        console.log("Error: ", error)
    }
}

exports.addFriends = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        const friend = new Friends({
            userId,
            friendId
        });
        const savedUserId = await friend.save();

        const updatedFriendList = await Signup.findByIdAndUpdate(
            userId,
            { $push: { friends: friend.friendId } },
            { new: true }
        );


        res.json({
            data: updatedFriendList
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

exports.getPosts = async(req, res) => {
    try {
        const posts = await Post.find({});

        res.status(200)
        .json({
            success: true,
            data: posts,
            message: "All Posts are fetched"
        })
    }
    catch(error) {
        console.log("Error: ", error)
    }
}

exports.getPostOfUser = async(req, res) => {
    try {
        const id = req.params.id;
        const post = await Signup.findById({_id: id})

        if(!post) {
            return res.status(404).json({
                success: false,
                message: "No Data Found with the Given Id"
            })
        }

        res.status(200).json({
            success: true,
            data: post,
            message: "Data has been fetched."
        })
    }
    catch(error) {
        console.log("Error: ", error)
    }
}


exports.getPostById = async(req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById({_id: id})


        if(!post) {
            return res.status(404).json({
                success: false,
                message: "No Data Found with the Given Id"
            })
        }

        res.status(200).json({
            success: true,
            data: post,
            message: "Data has been fetched"
        })
    }

    catch(error) {
        console.log("Error: ", error)
    }
}

exports.getComments = async(req, res) => {
    try {
        const comments = await Comment.find({});

        res.status(200).json({
            success: true,
            message: "All Comments has been fetched.",
            data: comments
        })
    }
    catch(error) {
        console.log("Error", error)
    }
}

exports.getAllUsers = async(req, res) => {
    try {
        const users = await Signup.find({});

        res.status(200).json({
            success: false,
            message: "All users has been fetched.",
            data: users
        })
    }
    catch(error) {
        console.log("Error: ", error)
    }
}

exports.getCommentsByPostId = async(req, res) => {
    try {
        const id = req.params.id;
        const comments = await Comment.find({postId: id});

        if(!comments) {
            return res.status(404).json({
                success: false,
                message: "No Data Found with the Given Id"
            })
        }

        res.status(200).json({
            success: true,
            data: comments,
            message: "Data fetched successfully"
        })
    }
    catch(error) {
        console.log("Error: ", error)
    }
}

exports.getLikebyPostId = async(req, res) => {
    try {
        const id = req.params.id;
        const likes = await Like.find({postId: id});

        if(!likes) {
            return res.status(404).json({
                success: false,
                message: "No Data Found with the Given Id"
            })
        }

        res.status(200).json({
            success: true,
            data: likes,
            message: "Data fetched successfully"
        })
    }
    catch(error) {
        console.log("Error: ", error)
    }
}

exports.getLikesofUser = async (req, res) => {
    try {
        const { postId, userId } = req.query; // Assuming postId and userId are sent as query parameters

        const likedPost = await Like.find({ 'postId': (postId), userId: userId });

        if (likedPost.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No, this person did not like the post"
            });
        }

        res.status(200).json({
            success: true,
            data: likedPost,
            message: "Yes, this person liked the post"
        });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
