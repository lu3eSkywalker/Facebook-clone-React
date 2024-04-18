const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/Cloudinary');
const Post = require('../models/Post');
const Signup = require("../models/Signup");


exports.UploadLogic = async(req, res) => {
    try {
        // const result = await cloudinary.uploader.upload(req.file.path);

        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        } else {
            // Handle file sent through other means (e.g., Postman)
            // Assuming you're accessing the file from the request body
            result = await cloudinary.uploader.upload(req.body.filePath);
        }

        const {userId} = req.body;

        const newFile = new Post({
            userId: userId,
            originalName: req.file.originalName,
            cloudinaryUrl: result.secure_url
        });
        await newFile.save();

        
        
        const updatedPostForUser = await Signup.findByIdAndUpdate(userId, {$push: {post: newFile._id}}, {new: true})
        res.status(200).json({
            success: true,
            message: "Uploaded!",
            data: result
        });
    }
    catch(error) {
        console.log("Error: ", error)
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}
exports.profilePicture = async(req, res) => {
    try {
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        } else {
            result = await cloudinary.uploader.upload(req.file.filepath);
        }

        const {userId} = req.body;
        
        // const newFile = new Signup({
        //     profilePicture: result.secure_url
        // });
        
        const updatedProfilePictureForUser = await Signup.findByIdAndUpdate(userId, {$push: {profilePicture: result.secure_url}}, {new: true})
        res.status(200).json({
            success: true,
            message: "Uploaded!",
            data: result
        });

    }
    catch(error) {
        console.log("Error: ", error)
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}