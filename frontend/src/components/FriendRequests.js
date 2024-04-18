import React, { useEffect, useState } from 'react'

const FriendRequests = () => {

    const [name, setName] = useState();
    const [userArray, setUserArray] = useState([]); 
    const [request, setRequest] = useState([]);

    useEffect(() => {
        pendingFriendRequests()
    }, []) 

    const tobefriendId = localStorage.getItem('userId');


    const pendingFriendRequests = async() => {
        const tobefriendId = localStorage.getItem('userId');

        try {
            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/searchfriendrequest`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({tobefriendId: tobefriendId}),
                },
            )
            console.log("FORM RESPONSE...", savedUserResponse)

            const res = await savedUserResponse.json();
            setRequest(res.data)

            const userIdArray = res.data

            const friendsId = await Promise.all(
              userIdArray.map(async (friendId) => {
                    try{
                        const getFriendsInfo = await fetch(`${process.env.REACT_APP_BASE_URL}/getuserpost/${friendId.userId}`, { method: "GET" });
                        const response = await getFriendsInfo.json();
                        return response.data
                    }
                    catch(error) {
                        console.log("Error: ", error)
                    }
                })
            );
            // console.log(friendsId)
            const flatArray = friendsId.flat();
            console.log(flatArray)
            setUserArray(flatArray)

        }
        catch(error) {
            console.log("Error: ", error)
        }
    }

    const buttonHandlerAccept = async(userId, reqId) => {

        const requestAccept = {
            requestId: reqId,
            status: "Accept",
            tobefriendId: tobefriendId,
            userId: userId
        }
        console.log(requestAccept)

        try {
            const savedResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/friendrequestaccept`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...requestAccept})
            });

            const response = await savedResponse.json();
            console.log(response)
            pendingFriendRequests()

        }
        catch(error) {
            console.log("Error: ", error)
        }
    }

    const buttonHandlerReject = async(userId, reqId) => {
        const requestReject = {
            requestId: reqId,
            status: "Reject"
        }
        console.log(requestReject)

        try {
            const savedResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/friendrequestaccept`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...requestReject})
            });

            const response = await savedResponse.json();
            console.log(response)

        }
        catch(error) {
            console.log("Error: ", error)
        }

        
    }



    return (
        <div>
            <h2>FriendRequests</h2>
            <br></br>
            <div className="">
                <br></br>
                {userArray.map((user) => (
                    <div key={user._id} className='flex my-4'>
                        <img src={user.profilePicture} className='h-10 flex' />
                        <p>{user.name}</p>
                        {request.map((reqId) => {
                            if (reqId.userId === user._id) {
                                return (
                                    <div key={reqId._id}>
                                        <button
                                            className="mx-2 bg-green-400 font-bold text-white px-2"
                                            onClick={() => buttonHandlerAccept(user._id, reqId._id)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="mx-2 bg-blue-400 font-bold text-white px-2"
                                            onClick={() => buttonHandlerReject(user._id, reqId._id)}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FriendRequests