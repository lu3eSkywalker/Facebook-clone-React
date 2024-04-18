import React, { useEffect, useState } from 'react'
import DynamicImage from './Post/DynamicImage'




const FriendsPosts = ({postId}) => {

    // console.log("postId: ", postId)

    const [image, setImage] = useState('');
    const [likeCount, setLikeCount] = useState(0);
    const [comment, setComment] = useState([]);
    const [name, setName] = useState('');
    const [profilepic, setProfilePic] = useState('');
    const [formData, setFormData] = useState({
        comments: ""
    });
    const [showComments, setShowComments] = useState(false);
    const [colorLike, setColorLike] = useState(false)

    useEffect(() => {
        getPostData(postId)
    }, [postId])



    const getPostData = async (postId) => {
        const userId = localStorage.getItem('userId');

        try {
            const postUrl = await fetch(`${process.env.REACT_APP_BASE_URL}/getpost/${postId}`, { method: "GET" });
            const postData = await postUrl.json();
            // console.log(postData.data.cloudinaryUrl);
            setImage(postData.data.cloudinaryUrl);

            const userName = postData.data.userId;
            const personName = await fetch(`${process.env.REACT_APP_BASE_URL}/getuserpost/${userName}`, { method: "GET" });
            const personNamejson = await personName.json();
            console.log(personNamejson.data.name)
            setProfilePic(personNamejson.data.profilePicture)


            setName(personNamejson.data.name)

            
            const postLikes = await fetch(`${process.env.REACT_APP_BASE_URL}/getlikesbypostid/${postId}`);
            const likesResponse = await postLikes.json();
            setLikeCount(likesResponse.data.length)



            //Color of like count
            const userLikedpost = await fetch(`${process.env.REACT_APP_BASE_URL}/getlikesofuser?userId=${userId}&postId=${postId}`, 
            {
                method: "GET"
            })

            const userLikedResponse = await userLikedpost.json()
            console.log(userLikedResponse)

            const responsetosendData = await userLikedResponse.success

            if(responsetosendData === true) {
                setColorLike(true)
            }


            const commentsData = await fetch(`${process.env.REACT_APP_BASE_URL}/getcommentbypostid/${postId}`);
            const commentsResponse = await commentsData.json();
            setComment(commentsResponse.data)
            // console.log(commentsResponse.data)


            
        }
        catch(error) {
            console.log(error)
        }
    }


    function changeHandler(e) {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }


    const postComment = async() => {
        const userId = localStorage.getItem('userId');

        const uploadComment = {
            userId: userId,
            postId: postId,
            body: formData.comments
        }


        try {
            const postComment = await fetch(`${process.env.REACT_APP_BASE_URL}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(uploadComment)
            })

            const postCommentResponse = await postComment.json();
            // console.log(postCommentResponse)
            await getPostData(postId)
            await setFormData({comments: ''})
        }
        catch(error) {
            console.log("Error: ", error)
        }
    }

    const toggleComments = () => {
        setShowComments(prevState => !prevState);
    }


    const likeButtonHandler = async (id) => {
        const userId = localStorage.getItem('userId');
        console.log(id)



        const uploadData = {
            userId: userId,
            postId: id
        }
        console.log(uploadData)

        try {

            const userLikedpost = await fetch(`${process.env.REACT_APP_BASE_URL}/getlikesofuser?userId=${userId}&postId=${id}`, 
            {
                method: "GET"
            })

            const userLikedResponse = await userLikedpost.json()
            console.log(userLikedResponse)

            const responsetosendData = await userLikedResponse.success

            if(responsetosendData === true) {
                setColorLike(true)
            }

             if(responsetosendData === false) {
                try {
                    const postLike = await fetch(`${process.env.REACT_APP_BASE_URL}/like`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(uploadData)
                    })

                    const response = await postLike.json();
                    console.log(response.data)
                }
                catch(error) {
                    console.log("Error: ", error)
                }


            const postLikes = await fetch(`${process.env.REACT_APP_BASE_URL}/getlikesbypostid/${postId}`);
            const likesResponse = await postLikes.json();
            setLikeCount(likesResponse.data.length)
            setColorLike(true)



            }
            else {
                console.log("You have already liked the post")
            }


        }
        catch(error) {
            console.log("Error: ", error)
        }
    }



return (
    
    <div>

    <div className='flex justify-center items-center h-screen'>
        
        <div className='bg-white shadow-md rounded-lg w-192 p-8'>

        <div className="flex items-center mb-8">
          <img src={profilepic} alt="Profile" className="rounded-full h-16 w-16 mr-4" />
          <span className='font-semibold text-lg'>{name}</span>
        </div>

            <DynamicImage src={image} />

            <p>This is a caption</p>

            <div className='flex justify-between'>
                <button 
                className='flex items-center space-x-1 text-gray-500 hover:text-blue-500'
                onClick={() => likeButtonHandler(postId)}
                >
                    <span className='flex'>{likeCount} {colorLike ? (<p className='font-bold text-blue-500 text-white mx-1'>Liked</p>): 'Like'}</span>
                </button>



                <button
                    className='flex items-center space-x-1 text-gray-500 hover:text-blue-500'
                    onClick={toggleComments}
                >
                    <span>{showComments ? 'Hide Comments': 'Comments'}</span>
                </button>



            </div>

            {showComments && (
                <div>
                    <div>
                        <input 
                        type='text'
                        placeholder='Comment'
                        name='comments'
                        onChange={changeHandler}
                        value={formData.comments}
                        className='h-10'
                        />
                        <button onClick={postComment}>Post</button>
                    </div>

                    <div>
                        {comment && comment.map((comment) => (
                            <p>{comment.body}</p>
                        ))}
                    </div>
            
                </div> 
                )}
        
         
            
        </div>
    </div>


    </div>

)

}

export default FriendsPosts