import React, { useEffect, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom';

const OwnProfile = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [friends, setFriends] = useState('');
    const [uploadsuccess, setUploadSuccess] = useState('');
    const [profilepic, setProfilePic] = useState('');


    const navigate = useNavigate();


    // const name = localStorage.getItem('name')
    const userId = localStorage.getItem('userId');


    useEffect(() => {
        getInfo();
    }, []);



    const getInfo = async() => {
        try {
            const getUserInfo = await fetch(
                `${process.env.REACT_APP_BASE_URL}/getuserpost/${userId}`,
                {
                    method: "GET",
                }
            );

            const response = await getUserInfo.json();
            // console.log(response)
            setProfilePic(response.data.profilePicture)

            setName(response.data.name)
            setEmail(response.data.email)
            let friendsList = [];
            friendsList = response.data.friends
            // console.log(friendsList)



            const friendNames = await Promise.all(
                friendsList.map(async (friendId) => {
                    try {
                        const getFriendsName = await fetch(
                            `${process.env.REACT_APP_BASE_URL}/getuserpost/${friendId}`,
                            { method: "GET" }
                        );
            
                        const response = await getFriendsName.json();
                        // console.log(response.data.profilePicture)
                        console.log(response.data)
                        // return response.data.name;
                        return response.data;

                    } catch (error) {
                        console.log(error);
                        return null; 
                    }
                })
            );
            setFriends(friendNames)

            

        }
        catch(error) {
            console.log("Error: ", error)
        }
    }
    
    const handleFileUpload = async(e) => {
        const image = e.target.files[0];

        const userId = localStorage.getItem('userId');

        const formData = new FormData();
        formData.append('image', image)
        formData.append('userId', userId)

        try {
            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/uploadprofilepic`,
                {
                    method: "POST",
                    body: formData
                }
            );

            const responseData = await savedUserResponse.json();
            if (responseData.success) {
                console.log("Upload Successfull");
                setUploadSuccess("Your file has been uploaded");
            } else {
                console.error("Upload failed:", responseData.message);
            }
        }
        catch(error) {
            console.log("Error: ", error)
        }
    }

    
    function buttonHandler(userId) {
        navigate(`/getuserpost/${userId}`)
    }



  return (
    <div>
        <div className='grid place-items-center h-screen'>
            <p className='font-bold text-lg'>{name}</p>
            <div>
            <div className='flex items-center'>
                    <input 
                        type='file' 
                        onChange={handleFileUpload} 
                        className='opacity-0 absolute'
                        aria-hidden='true'
                    />
                    <label htmlFor='fileInput' className='cursor-pointer'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                            Upload Profile Picture
                        </button>
                    </label>
                    <div className='ml-4'>
                        <img src={profilepic} className='h-40 w-30' alt='Profile' />
                    </div>
                </div>
                <p className='mt-2'>{uploadsuccess}</p>
            </div>




            <p>{email}</p>
            <p>
               <p className='font-bold text-lg'>Friends </p> 
                {friends && friends.map((friend) => (
                <div className='py-2 flex'>
                    <img src={friend.profilePicture} className='h-[70px]' />
                <button
                onClick={() => buttonHandler(friend._id)}
                className='font-bold bg-blue-500 rounded-sm text-lg text-white px-2'
                >{friend.name}</button>
                </div>
            ))}
            </p>

            <p>
                <button onClick={() => navigate('/ownpost')}
                className='font-bold bg-orange-400 rounded-lg text-lg'
                >Own Posts</button>
            </p>
        </div>


    </div>
  )
}

export default OwnProfile