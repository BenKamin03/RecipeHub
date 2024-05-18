import React, { useEffect, useState } from 'react'
import Session from '../../middleware/Session'
import LoadingPage from '../../components/Loading';

const Following = () => {

    const [profile, setProfile] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Session.getProfile(Session.getQueries().name);

                console.log(response)

                if (response == null) {
                    Session.redirectTo(null, "/");
                }

                for (let user of response.followers) {
                    console.log(user);
                    const p = await Session.getProfile(user);
                    setFollowers(prevFollowers => [...prevFollowers, p]);
                }

                for (let user of response.following) {
                    console.log(user);
                    const p = await Session.getProfile(user);
                    setFollowing(prevFollowing => [...prevFollowing, p]);
                }

                setProfile(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='mw-24 my-12 flex justify-center items-center'>
            {profile !== null ?
                <div className='grid grid-cols-2 w-1/2'>
                    <div className='aspect-[1/1.5] overflow-auto border-r-2 pr-2 ml-2'>
                        <h1 className='text-center font-semibold text-xl my-2'>Following</h1>
                        <div className=''>
                            {following.map((follower, index) => {

                                const followerProfile = Session.getProfile(follower);

                                return (
                                    <div key={index} onClick={(e) => Session.redirectTo(e, `/profile?name=${followerProfile.name}`)} className='h-min my-1 p-2 rounded-lg cursor-pointer border-2 flex flex-row'>
                                        <div className={"bg-black rounded-full aspect-square w-12"}>
                                            <img
                                                src={followerProfile.img}
                                                className="h-full w-full rounded-full mr-4 object-center object-cover bg-black"
                                                alt="Profile"
                                            />
                                        </div>
                                        <h1 className='w-full ml-2 text-left pt-2'>{followerProfile.name}</h1>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='aspect-[1/1.5] overflow-auto mx-2'>
                        <h1 className='text-center font-semibold text-xl my-2'>Followers</h1>
                        {followers.map((follower, index) => {

                            const followerProfile = Session.getProfile(follower);

                            return (
                                <div key={index} onClick={(e) => Session.redirectTo(e, `/profile?name=${followerProfile.name}`)} className='h-min my-1 p-2 rounded-lg cursor-pointer border-2 flex flex-row'>
                                    <div className={"bg-black rounded-full aspect-square w-12"}>
                                        <img
                                            src={followerProfile.img}
                                            className="h-full w-full rounded-full mr-4 object-center object-cover bg-black"
                                            alt="Profile"
                                        />
                                    </div>
                                    <h1 className='w-full ml-2 text-left pt-2'>{followerProfile.name}</h1>
                                </div>
                            )
                        })}
                    </div>

                </div>
                :
                <LoadingPage />}
        </div>
    )
}

export default Following