const Signup = require("../models/Signup");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const FriendRequest = require("../models/FriendRequest");



exports.signup = async(req, res) => {

    try {

        const {name, email, password, post, friends, profilePicture} = req.body;

        const existingUser = await Signup.findOne({email});

        if(existingUser) {
            return res.json({
                success: false,
                message: "User Already Exists"
            })
        }

        let hashedPassword;

        hashedPassword = await bcrypt.hash(password, 10)

        const user = await Signup.create({
            name,
            email,
            password: hashedPassword,
            post,
            friends,
            profilePicture
        })

        return res.status(200).json({
            success: true,
            data: user,
            message: "Account created Successfully"
        })
    }
    
    catch(error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "There has been as error signing up."
        })
    }
}

exports.login = async(req, res) => {
    try {
        const {email, password} = req.body;

        const existingUser = await Signup.findOne({email})

        if(!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User not registered"
            })
        }

        let correctPassword = await bcrypt.compare(password, existingUser.password)

        if(!correctPassword) {
            return res.status(500).json({
                success: false,
                message: "Wrong Password"
            }) 
        }
        
        const payload = {
            email: existingUser.email,
            id: existingUser._id,
        }


            const token = jwt.sign({payload}, process.env.JWT_SECRET, { expiresIn: "24hr"})

            return res.status(200).json({
                success: true,
                message: "User Logged in Successfully",
                token,
                data: existingUser
            })

    }
    catch(error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}


exports.friendRequestStatus = async(req, res) => {
    try {
        const {userId, tobefriendId, status} = req.body;

        const friendRequest = await FriendRequest.create({
            userId,
            tobefriendId,
            status
        })

        res.status(200).json({
            success: true,
            data: friendRequest,
            message: "Your Request has be created"
        })

    }
    catch(error) {
        console.log("Error: ", error)
    }
}


exports.friendRequestAccept = async(req, res) => {
    try {
        const {tobefriendId, requestId, status, userId} = req.body;

        if(status === 'Accept') {
           await FriendRequest.findByIdAndUpdate(
            requestId,
            {$set: {status: "Accept"} },
           );

           const updateOne = await Signup.findByIdAndUpdate(
            tobefriendId,
            {$push: {friends: userId} },
            { new: true }
           );


           const updateTwo = await Signup.findByIdAndUpdate(
            userId,
            {$push: {friends: tobefriendId}},
            { new: true }
           )

           res.status(200).json({
            success: true,
            data: updateOne,
            message: `Updated Successfully`,
           })
        }
        else {
            await FriendRequest.findByIdAndUpdate(
                requestId, 
                {$set: {status: "Reject"} },
            );

            res.status(400).json({ message: "ID Rejected" });
        }
    }
    catch(error) {
        console.log("Error: ", error)
    }
}

exports.searchFriendRequests = async(req, res) => {
    try {
        const {tobefriendId} = req.body;
        const pendingRequests = await FriendRequest.find({tobefriendId: tobefriendId, status: "Pending"})

        if(!pendingRequests) {
            return res.status(404).json({
                success: false,
                message: "No Data Found with the Given Id"
            })
        }

        res.status(200).json({
            success: true,
            data: pendingRequests,
            message: "data fetched successfully"
        })
    }
    catch(error) {
        console.log("Error: ", error)
    }
}