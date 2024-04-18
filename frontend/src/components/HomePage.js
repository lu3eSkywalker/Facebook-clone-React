import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  let logoutButton = null;
  if(userId) {
    logoutButton = <button 
    className='px-2 rounded-lg mx-10 font-bold text-white bg-blue-600'
    onClick={() => removeLocalStorageItem()}>Logout</button>
  }


  function removeLocalStorageItem() {
    localStorage.removeItem('userId');
    localStorage.removeItem('name')
    navigate('/')
  }



  return (
    <div>
      <nav className='py-10 bg-blue-300'>
      <p className='font-bold text-xl'>
        SkywalkerBook</p>

      <p className='flex justify-end'>
      <button onClick={() => navigate('/upload')}
      className='px-2 mx-10 rounded-lg font-bold text-white bg-blue-600'
      >PostMeme</button>

<button 
      className='px-2 rounded-lg mx-10 font-bold text-white bg-blue-600'
      onClick={() => navigate('/frontpage')}>
        HomeFeed</button>

      <button 
      className='px-2 rounded-lg mx-10 font-bold text-white bg-blue-600'
      onClick={() => navigate('/ownprofile')}>
        Own Profile</button>


        <button className='px-2 rounded-lg font-bold text-white bg-blue-600'
        onClick={() => navigate('/friendrequest')}
        >Friend Requests</button>

        <button className='px-2 rounded-lg mx-10 font-bold text-white bg-blue-600'
        onClick={() => navigate('/list')}
        >Other Users</button>


  {logoutButton}


      </p>

</nav>
      
    </div>
  )
}

export default HomePage