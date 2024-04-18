import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FriendsPost from './FriendsPost';

const UserPage = () => {

    const {userId} = useParams();
    const [profile, setProfile] = useState([]);
    const [postData, setPostData] = useState([]);
    const [currentuserFriend, setCurrentUserFriend] = useState([]);
    const [requestStatus, setRequestStatus] = useState([]);

    useEffect(() => {
        getAllContent(userId)
    }, [userId])

    const currentUserId = localStorage.getItem('userId');
    // console.log(currentUserId)


    const getAllContent = async() => {
        try {
            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/getuserpost/${userId}`, { method: "GET"});

                const response = await savedUserResponse.json();
                setProfile(response.data)

                // console.log(response.data.post)

                const fetchedPosts = [];
                for (const postId of response.data.post) {
                    try {
                    const savedPosts = await fetch(`${process.env.REACT_APP_BASE_URL}/getpost/${postId}`, { method: "GET" });
                    const postResponse = await savedPosts.json();
                    fetchedPosts.push(postResponse.data);
                    }
                    catch(error) {
                        console.log("Error: ", error)
                    }
                }

                setPostData(fetchedPosts);


        }
        catch(error) {
            console.log("Error: ", error)
        }
    }


    const buttonHandler = async(tobefriendId) => {
        const userId = localStorage.getItem('userId');
        const status = "Pending"

        const bodyData = {
            userId: userId, 
            tobefriendId: tobefriendId,
            status: status
        }


        try {
            const savedUserResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/friendrequest`,
            {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...bodyData})
            });

            getRequestStatus(tobefriendId)
        }
        catch(error) {
            console.log("Error: ", error)
        }

    }



        const getCurrentUserInfo = async(req, res) => {
            try {
                const savedUserResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/getuserpost/${currentUserId}`, {method: "GET"});
                const response = await savedUserResponse.json();
                // console.log(response.data)
                // console.log(response.data.friends[0])
                setCurrentUserFriend(response.data.friends)
                
            }
            catch(error) {
                console.log(error)
            }
        }

        useEffect(() => {
            getCurrentUserInfo();
        }, [])



        const tobefriendId = profile._id

        useEffect(() => {
            getRequestStatus(tobefriendId)
        }, [tobefriendId])


const getRequestStatus = async(tobefriendId) => {
    console.log(tobefriendId)

    try {
        const savedUserResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/searchfriendrequest`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({tobefriendId: tobefriendId})  
        })
        const response = await savedUserResponse.json();
        // console.log(response.data)
        setRequestStatus(response.data)

    }
    catch(error) {
        console.log("Error: ", error)
    }
}





function yodaId(id) {
    console.log(id)
}

    
  return (
    <div>

        {<div>
            
            <p className='font-bold text-lg'>{profile.name}</p>
            <img src={profile.profilePicture} className='h-40' />

                {
                    currentuserFriend.includes(profile._id) ? (
                        <button>Message</button>
                    ):
                    
                    requestStatus && requestStatus.some(data => data.userId === currentUserId && data.status === "Pending") ?
                    (<p>Request Sent</p>): (
                        <button
                            onClick={() => buttonHandler(profile._id)}
                            className='font-bold text-white bg-blue-400 rounded-sm'
                        >
                            Add Friend
                        </button>
                    )
                }


                {requestStatus && requestStatus.map((data) => (
                    <div>
                        {console.log(data.userId)}
                        {console.log(data.status)}
                    </div>
                ))}


            <br></br>
            <label>Email: {profile.email}</label> 
            
        </div>}

        {postData && postData.map((data) => (
            <FriendsPost key={data._id}  postId={data._id} />
        ))}
    </div>
  )
}

export default UserPage