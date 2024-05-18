import React, { useState, useEffect, useRef } from 'react';

import Session from "../middleware/Session";

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileHeader = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(Session.isLoggedIn() ? Session.getSessionData().name : "Logged Out");
    const [pfp, setPFP] = useState(Session.isLoggedIn() ? Session.getSessionData().img : "/favicon.ico");
    const [profile, setProfile] = useState(Session.getProfile(null));
    const dropdownRef = useRef(null);

    console.log(Session.getSessionData())

    Session.addSessionListener(() => {
        if (Session.getSessionData()) {
            let user = Session.getSessionData().name;
            if (user !== null) {
                setName(user)
            }
        } else
            setName("Undefined")
    })

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setProfile(Session.getProfile(name));
    }, [name])



    return (
        <div className='flex flex-row h-full justify-center content-center'>
            <a href={`/profile?name=${name}`} className='flex flex-row justify-center content-center h-10'>
                <div className='bg-black aspect-square h-full rounded-full'>
                    <img
                        src={pfp}
                        className="h-full w-full rounded-full mr-4 object-center object-cover bg-black"
                        alt="Profile"
                    />
                </div>
                {name !== null && <h1 className='align-middle p-2'>{name}</h1>}
            </a>
            <button onClick={(e) => toggleMenu()} ref={dropdownRef}>
                <FontAwesomeIcon className="ml-6 p-2" icon={faCaretDown} />
            </button>
            {isOpen && (
                <div
                    className="origin-top-right mt-12 absolute right-0 mr-16 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    <div className="py-1" role="none">
                        <button
                            onClick={(e) => {
                                Session.redirectTo(e, `/profile?name=${name}`)
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            View Profile
                        </button>
                        <button
                            onClick={(e) => {
                                Session.redirectTo(e, "/settings")
                            }}
                            className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            Settings
                        </button>
                        <button
                            onClick={(e) => {
                                Session.logOut(e)
                            }}
                            className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileHeader