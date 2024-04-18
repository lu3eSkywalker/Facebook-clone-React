import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FriendsPost from './FriendsPost';

const Frontpage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [oneDArray, setOneDArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const getUserInfo = await fetch(`${process.env.REACT_APP_BASE_URL}/getuserpost/${userId}`, { method: "GET" });
      const response = await getUserInfo.json();
      const friendsArray = response.data.friends;

      const friendsId = await Promise.all(
        friendsArray.map(async (friendId) => {
          try {
            const getfriendspost = await fetch(`${process.env.REACT_APP_BASE_URL}/getuserpost/${friendId}`, { method: "GET" });
            const response = await getfriendspost.json();
            return response.data.post;
          } catch (error) {
            console.log("Error: ", error);
          }
        })
      );

      const flattenedArray = friendsId.flat();
      setOneDArray(flattenedArray);
      setIsLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        oneDArray.length > 0 &&
        oneDArray.map((postId) => (
            <FriendsPost key={postId} postId={postId} />

        ))
      )}
    </div>
  );
};

export default Frontpage;