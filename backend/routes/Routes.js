const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer')


//Import Controller
const { signup, login, friendRequestStatus, friendRequestAccept, searchFriendRequests } = require("../controllers/SIgnup_login");
const { UploadLogic, profilePicture } = require('../controllers/UploadLogic'); 
const { likePost, createComment, getPosts, getPostOfUser, getPostById, getComments, getCommentsByPostId, getLikebyPostId, addFriends, getAllUsers, getLikesofUser } = require("../controllers/LikeAndComment");


//Mapping Create
router.post("/signup", signup)
router.post("/upload", upload.single('image'), UploadLogic);
router.post("/uploadprofilepic", upload.single('image'), profilePicture)
router.post("/login", login)
router.post("/like", likePost)
router.post("/comment", createComment)
// router.get("/getpost", getPosts)
router.get("/getuserpost/:id", getPostOfUser)
router.get("/getpost/:id", getPostById)
router.get("/getallcomments", getComments)
router.get("/getcommentbypostid/:id", getCommentsByPostId)
router.get("/getlikesbypostid/:id", getLikebyPostId)
router.post('/addfriends', addFriends)
router.get('/getallusers', getAllUsers)
router.post('/friendrequest', friendRequestStatus)
router.post('/friendrequestaccept', friendRequestAccept)
router.post('/searchfriendrequest', searchFriendRequests)
router.get('/getlikesofuser', getLikesofUser)


//export
module.exports = router;