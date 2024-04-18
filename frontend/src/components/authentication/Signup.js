import React, { useContext } from 'react'
import NoteContext from '../../context/NoteContext'
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const {signupform, setSignUpForm} = useContext(NoteContext)
    const navigate = useNavigate();
  
    function changeHandler(e) {
        const {name, value} = e.target;

        setSignUpForm((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const submitHandler = async(e) => {
        e.preventDefault();

        try{
            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({...signupform}),
                }
            );

            console.log("FORM RESONSE.........", savedUserResponse)

            const res = await savedUserResponse.json();
            console.log(res.success);

            if(res.success === true) {
                navigate('/frontpage')
            } else {
                console.log("Error Signing in");
            }

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
            placeholder='name'
            name='name'
            onChange={changeHandler}
            value={signupform.name}
            class="border border-gray-300 rounded h-9 w-75 placeholder: px-2 mb-2"

            />

            <input 
            type='text'
            placeholder='email'
            name='email'
            onChange={changeHandler}
            value={signupform.email}
            class="border border-gray-300 rounded h-9 w-75 placeholder: px-2 mb-2"

            />

            <input 
            type='text'
            placeholder='password'
            name='password'
            onChange={changeHandler}
            value={signupform.password}
            class="border border-gray-300 rounded h-9 w-75 placeholder: px-2 mb-2"

            />
            </form>
            </div>
              
            <div class="flex justify-center">
                <button 
                onClick={submitHandler}
                class="h-9 w-[225px] font-bold text-white bg-blue-500 rounded">Log In</button>
            </div>

            </div>

                
            </div>
    </div>
  )
}

export default Signup