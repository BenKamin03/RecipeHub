import React, { useEffect, useState } from 'react'

import Session from '../middleware/Session'

const Comment = ({ comment }) => {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Session.getProfiles();
                setProfile(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='border-2 p-2 rounded-lg my-4'>
            {profile != null &&
                <div className='flex flex-row h-min w-full justify-between p-4'>
                    <a href={`/profile?name=${profile.name}`} className='flex flex-row justify-center content-center'>
                        <div className='bg-black aspect-square h-10 rounded-full'>
                            <img
                                src={Session.getProfile(profile.name).img}
                                className="h-full w-full rounded-full mr-4 object-center object-cover bg-black"
                                alt="Profile"
                            />
                        </div>
                        <h1 className='align-middle p-2'>{profile.name}</h1>
                    </a>
                    <p className='pl-5 align-middle p-2'>{comment.rating} / 5</p>
                </div>}
            <p className='my-4 p-4'>
                {comment.message}
            </p>
        </div>
    )
}

export default Comment