import React, { useContext } from 'react'
import NoteContext from '../../context/NoteContext'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const {loginformData, setLoginFormData} = useContext(NoteContext);

  const navigate = useNavigate();

  function changeHandler(e) {
    const {name, value} = e.target;

    setLoginFormData((prevloginformData) => ({
      ...prevloginformData,
      [name]: value
    }))
  }

  const buttonHandler = async(e) => {
    e.preventDefault();

    try {
      const savedUserResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...loginformData}),
        }
      );

      console.log("FORM RESPONSE.... ", savedUserResponse)

      const res = await savedUserResponse.json();
      console.log(res)


      if(res.success) {
        navigate('/frontpage')
      } else {
        console.log("Wrong Password")
      }

      localStorage.setItem('userId', res.data._id)
      localStorage.setItem('name', res.data.name)
    }
    catch(error) {
      console.log("Error: ", error)
    }
  }

  return (
    <div>
    <div class="bg-gray-200 shadow-lg p-[150px]">

        <div class='bg-white shadow-md rounded-lg mx-[500px] mb-8 py-8'>
          <div class="flex justify-center">
            <p className='font-bold text-2xl text-blue-600 '>Skywalker Book</p>
                  </div>


      <div class="flex justify-center py-2">
      <form class="flex flex-col py-2">
        <input 
        type='text'
        name='email'
        placeholder='email'
        value={loginformData.email}
        onChange={changeHandler}
        class="border border-gray-300 rounded h-9 w-75 placeholder: px-2 mb-2"
        />

        <input 
        type='text'
        name='password'
        placeholder='password'
        value={loginformData.password}
        onChange={changeHandler}
        class="border border-gray-300 rounded h-9 w-75 placeholder: px-2"
        />
      </form>
      </div>

            <div class="flex justify-center">
                <button 
                onClick={buttonHandler}
                class="h-9 w-[225px] font-bold text-white bg-blue-500 rounded">Log In</button>
            </div>



            <div class="flex justify-center py-2">

                <div class="text-[11px] flex space-x-5 text-blue-600">
                    <p>Forgotten Account?</p>
                    <button onClick={() => navigate('/signup')}>Sign up for SkywalkerBook</button>
                </div>

            </div>


            </div>
            </div>


            <div class="text-[11px] flex tracking-widest justify-center text-gray-500 py-40">
            English (UK)
            தமிழ்
            తెలుగు
            ಕನ್ನಡ
            اردو
            हिन्दी
            മലയാളം
            සිංහල
            ਪੰਜਾਬੀ
            বাংলা ગુજરાતી
        </div>

    </div>
  )
}

export default Login