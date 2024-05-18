import React, { useState } from 'react'
import Session from '../../middleware/Session'

const Login = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    if (Session.isLoggedIn()) {
        Session.redirectTo("/")
    }

    return (
        <div className='flex justify-center content-center h-5/6'>
            <form className='w-1/2 flex-col h-full justify-center content-center'
                onSubmit={(e) => {
                    e.preventDefault();
                    Session.logIn(e, { name })
                }}>
                <h1 className='text-center font-semibold text-3xl'>Log In</h1>
                <input required onChange={handleNameChange} type='text' id='name' placeholder='Name or Email' className='py-2 my-1 w-full border-2 rounded-lg text-center' />
                <input required onChange={handlePasswordChange} type='password' id='password' placeholder='Password' className='py-2 my-1 w-full border-2 rounded-lg text-center' />
                <div className='flex justify-center content-center mt-4'>
                    <div className='grid grid-cols-2 w-1/2 gap-3'>
                        <button type='submit' className='bg-gray-200 text-gray-800 p-2 rounded-lg transition-all ease-in-out hover:scale-110'>Log In</button>
                        <button onClick={(e) => Session.redirectTo(e, "/register")} className='bg-gray-800 text-gray-200 p-2 rounded-lg transition-all ease-in-out hover:scale-110'>Register</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Login