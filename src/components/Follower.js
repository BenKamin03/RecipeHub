import React, { useState } from 'react'
import Session from '../middleware/Session'

const Follower = ({ followerName }) => {

    const [followerProfile, setFollowerProfile] = useState(null);

    useState(() => {
        const fetchData = async () => {
            console.log(followerName)
            const profile = await Session.getProfile(followerName)
            setFollowerProfile(profile)
            console.log(profile);
        }
        fetchData();
    }, [])

    return (
        <div>
            {followerProfile !== null &&
                <div onClick={(e) => Session.redirectTo(e, `/profile?name=${followerProfile.name}`)} className='h-min my-1 p-2 rounded-lg cursor-pointer border-2 flex flex-row'>
                    <div className={"bg-black rounded-full aspect-square w-12"}>
                        <img
                            src={followerProfile.img}
                            className="h-full w-full rounded-full mr-4 object-center object-cover bg-black"
                            alt="Profile"
                        />
                    </div>
                    <h1 className='w-full ml-2 text-left pt-2'>{followerProfile.name}</h1>
                </div>
            }
        </div>
    )
}

export default Follower