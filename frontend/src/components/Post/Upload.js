import React, { useState } from 'react';


const Upload = () => {

  const [uploadsuccess, setUploadSuccess] = useState('');



const handleFileUpload = async(e) => {
    const image = e.target.files[0];



    const userId = localStorage.getItem('userId');

    const formData = new FormData();
    formData.append('image', image)
    formData.append('userId', userId)

    console.log(formData)

    try {
        const savedUserResponse = await fetch(
          `${process.env.REACT_APP_BASE_URL}/upload`,
          {
            method: "POST",
            body: formData
          }
        );
      
        const responseData = await savedUserResponse.json();
        
        if (responseData.success) {
          console.log("Upload successful");
          setUploadSuccess("Your file has been uploaded");
        } else {
          console.error("Upload failed:", responseData.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      
    console.log(image)
}





  return (
    <div className='flex justify-center items-center h-screen'>
      <input 
      type="file" 
      onChange={handleFileUpload} 
      className='opacity-0 absolute'
      id="fileInput" 
      aria-hidden='true' />

      <label htmlFor="fileInput" className='cursor-pointer'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Upload Memes</button>
      </label>

      <div>
      <br></br>
      <br></br>
      {uploadsuccess}
      </div>
    </div>
  );
};

export default Upload;