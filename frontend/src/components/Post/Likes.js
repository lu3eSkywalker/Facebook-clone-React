import React, { useContext } from 'react'
import NoteContext from '../../context/NoteContext'

const Likes = () => {

    const {} = useContext(NoteContext);

    const fetchLikes = async() => {
        
        try {
            const postLikes = await fetch(
            `${process.env.REACT_APP_BASE_URL}/getlikesbypostid/${postId}`,
            {
                method: "GET",
            }
            );

            const response = await postLikes.json();
            console.log(response.data.length)
            setLikesCount(response.data.length)
        }
        catch(error) {
            console.log(error)
        }

        }


  return (
    <div></div>
  )
}

export default Likes