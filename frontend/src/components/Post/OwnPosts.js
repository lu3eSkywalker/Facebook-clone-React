import React, { useContext, useEffect, useState } from 'react';
import DynamicImage from './DynamicImage';
import NoteContext from '../../context/NoteContext';
import Comments from './Comments';


const OwnPosts = () => {
  const { formData, setFormData, input, setInput, fetchedCommment, setFectchedComment } = useContext(NoteContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const name = localStorage.getItem('name');
  const userId = localStorage.getItem('userId');

  const getPosts = async () => {
    try {
      const savedUserResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/getuserpost/${userId}`, {
        method: "GET",
      });

      const userPosts = await savedUserResponse.json();
      setPosts(userPosts.data.post);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async (postId) => {
    try {
      const savedComments = await fetch(`${process.env.REACT_APP_BASE_URL}/getcommentbypostid/${postId}`, {
        method: "GET",
      });

      const commentsResponse = await savedComments.json();
      setFectchedComment(commentsResponse);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      {posts.map(postId => (
        <PostCard key={postId} postId={postId}  getComments={getComments} name={name} />
      ))}
    </div>
  );
};


// toggleInput={toggleInput}






//PostCard

const PostCard = ({ postId, name }) => {
  const [meme, setMeme] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const [formData, setFormData] = useState({
    comments: ""
  })
  

  


  useEffect(() => {
    getPostData(postId);
  }, [postId]);


  function changeHandler(e) {
    const {name, value} = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }))

    }

    function buttonHandler(e) {
      e.preventDefault();

      console.log(formData)
    }




  const getPostData = async (postId) => {
    try {
      const postUrl = await fetch(`${process.env.REACT_APP_BASE_URL}/getpost/${postId}`);
      const postData = await postUrl.json();
      setMeme(postData.data.cloudinaryUrl);

      const postLikes = await fetch(`${process.env.REACT_APP_BASE_URL}/getlikesbypostid/${postId}`);
      const likesResponse = await postLikes.json();
      setLikeCount(likesResponse.data.length);

      const commentsData = await fetch(`${process.env.REACT_APP_BASE_URL}/getcommentbypostid/${postId}`);
      const commentsResponse = await commentsData.json();
      setComments(commentsResponse.data.map(comment => comment.body));



    } catch (error) {
      console.log(error);
    }
  };



  const userId = localStorage.getItem('userId');

  const uploadComment = {
    userId: userId,
    postId: postId,
    body: formData.comments
  };

  const postComment = async(e) => {
  try {
    const postComment = await fetch(`${process.env.REACT_APP_BASE_URL}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadComment)
    });
    const postCommentResponse = await postComment.json();
    if(!postCommentResponse.ok) {
      throw new Error('Failed to post comment');
    }

    //Clear the comment input field
    setFormData(prevFormData => ({
      ...prevFormData,
      comments: ""
    }));

    //Reload Comments
    // getComments(postId);
    getPostData(postId)


  }
  catch(error) {
    console.log(error)
  }
}
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg w-192 p-8">
        <div className="flex items-center mb-8">
          <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full h-16 w-16 mr-4" />
          <span className="font-semibold text-lg">{name}</span> {/* You need to fetch post user's name */}
        </div>

        <DynamicImage src={meme} />

        <p className="mb-8 text-lg">Lorem ipsum dolor sit amet, consectetur</p>

        <div className="flex justify-between">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
            <span>{likeCount} Likes</span>
          </button>

          {showComments ? 'Hide Comments' : "Show Comments"}
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
            <span>{`Comments`}</span>
          </button>
        </div>

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
          {comments.map((comment, index) => (
            <div key={index}>{comment}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnPosts;