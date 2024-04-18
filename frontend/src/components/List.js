import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const List = () => {


    const [listButton, setListButton] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = async() => {
        try {
            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/getallusers/`,
                {
                    method: "GET",
                }
                );
                const response = await savedUserResponse.json();
                // console.log(response.data)
                setListButton(response.data)
        }
        catch(error) {
            console.log(error)
        }
    }

    function buttonHandler(userId) {
        // console.log(userId);
        navigate(`/getuserpost/${userId}`);
    };


    return (
    <div>
    <div>
        {listButton && listButton.map((data) => (
            <div className='my-2'>
            <button className='px-2 text-white bg-blue-500 font-bold text-lg rounded-lg mx-2' 
            onClick={() => buttonHandler(data._id)}>{data.name}</button>
            </div>
        ))}
    </div>
    </div>
  )
}

export default List