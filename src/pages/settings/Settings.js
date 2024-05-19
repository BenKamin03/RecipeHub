import React, { useState } from 'react';
import Session from '../../middleware/Session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
    const [prevPassword, setPrevPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePrevPasswordChange = (e) => {
        setPrevPassword(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        await Session.handleChangePassword(e, { name: Session.getSessionData().name, password: prevPassword, newPassword: password })
    }

    return (
        <div className='mx-24 my-24'>
            <div className='justify-center content-center flex flex-col w-full'>
                <div className='w-full justify-center content-center flex'>
                    <img src='/recipehub/logo.png' className='w-min ' />
                </div>
            </div>
            <h1 className='text-center font-semibold text-xl'>Reset Password</h1>
            <form onSubmit={handleSubmit} className='mx-96'>
                <input required onChange={handlePrevPasswordChange} type='password' id='prevPassword' placeholder='Current Password' className='py-2 my-1 w-full border-2 rounded-lg text-center' />
                <input required onChange={handlePasswordChange} type='password' id='password' placeholder='Password' className='py-2 my-1 w-full border-2 rounded-lg text-center' />
                <input required onChange={handleConfirmPasswordChange} type='password' id='confirmPassword' placeholder='Confirm Password' className='py-2 my-1 w-full border-2 rounded-lg text-center' />
                <button type='submit' className='block bg-neutral-900 text-white py-2 mt-4 rounded-lg w-full transition-all ease-in-out hover:bg-neutral-800'>Change Password</button>
            </form>
            <div className='mx-96'>
                <button
                    type="button"
                    onClick={(e) => {
                        let p = window.prompt("Confirm Delete: Enter Password")
                        console.log(p);
                        if (p !== null && p !== "") {
                            Session.removeUser(e, p);
                        }
                    }}
                    className="text-white mt-1 w-full py-2 rounded bg-red-500 hover:bg-red-600 transition ease-in-out">
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Remove Account
                </button>
            </div>
        </div>
    );
}

export default Settings;
