import React, { useState } from 'react'
import Session from '../../middleware/Session'

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    if (Session.isLoggedIn()) {
        Session.redirectTo("/")
    }

    return (
        <div className='flex justify-center content-center h-5/6'>
            <form
                className='w-1/2 flex-col h-full justify-center content-center'
                onSubmit={(e) => {
                    e.preventDefault()
                    Session.register(e, { username: username, password: password })
                }}
            >
                <h1 className='text-center font-semibold text-3xl'>Register</h1>
                <input required onChange={handleUsernameChange} type='email' id='email' placeholder='Email' className='py-2 my-1 w-full border-2 rounded-lg text-center' />
                <input required onChange={handleUsernameChange} type='text' id='username' placeholder='Username' className='py-2 my-1 w-full border-2 rounded-lg text-center' />
                <input required onChange={handlePasswordChange} type='password' id='password' placeholder='Password' className='py-2 my-1 w-full border-2 rounded-lg text-center' />
                <div className='flex justify-center content-center mt-4'>
                    <div className='grid grid-cols-2 w-1/2 gap-3'>
                        <button type='submit' className='bg-gray-800 text-gray-200 p-2 rounded-lg transition-all ease-in-out hover:scale-110'>Register</button>
                        <button onClick={(e) => Session.redirectTo(e, "/login")} className='bg-gray-200 text-gray-800 p-2 rounded-lg transition-all ease-in-out hover:scale-110'>Log In</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Register