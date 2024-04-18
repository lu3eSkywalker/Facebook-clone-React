import React, { useContext } from 'react'
import NoteContext from '../../context/NoteContext';

const Comments = (props) => {


  const {formData, setFormData, input, setInput, fetchedCommment, setFectchedComment} = useContext(NoteContext)


  function changeHandler(e) {
    const {name, value} = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }))

    }


    const PostComment = async(e) => {
        e.preventDefault();
    
        console.log(formData)
    
        const postId = localStorage.getItem('postId');
        const userId = localStorage.getItem('userId');
    
        const uploadComment = {
          userId: userId,
          postId: postId,
          body: formData.comments
        }
    
        try {
          const savedUserComment = await fetch(
            `${process.env.REACT_APP_BASE_URL}/comment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(uploadComment)
            }
          );
    
          const Response = await savedUserComment
    
          console.log("COMMENT RESPONSE.........", Response)

          setFormData(prevFormData => ({
            ...prevFormData,
            comments: ''
          }));


          props.getComments();

        }
        catch(error) {
          console.log("Error fetching data: ", error)
        }
    
    
      }


      return (
        <div>
          {input && (
            <div className='py-4'>
              <input 
                type='text'
                placeholder='Comment'
                name='comments'
                onChange={changeHandler}
                value={formData.comments}
                className='h-10'
              />
              <button onClick={PostComment}>
                <span className='font-bold text-white bg-blue-600 rounded-lg py-3 px-3 mx-4'>Post Comment</span>
              </button>


              <div className='text-lg'>

                <br></br>

                {fetchedCommment && fetchedCommment.data && 
                fetchedCommment.data.map((comment) => (
                <p key={comment._id} className='py-2'>{comment.body}</p>
                ))
                }

            </div>


            </div>
          )}

        

        </div>
      );
      
}

export default Comments
