import React, { useEffect, useState } from 'react'
import Session from '../../middleware/Session'
import LoadingPage from '../../components/Loading';
import Follower from '../../components/Follower';

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

                setFollowers(response.followers)
                setFollowing(response.following);

                console.log(response.followers)

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
                            {following.map((follower, index) => (
                                <Follower key={index} followerName={follower} />
                            ))}
                        </div>
                    </div>
                    <div className='aspect-[1/1.5] overflow-auto mx-2'>
                        <h1 className='text-center font-semibold text-xl my-2'>Followers</h1>
                        {followers.map((follower, index) => <Follower key={index} followerName={follower} />)}
                    </div>

                </div>
                :
                <LoadingPage />}
        </div>
    )
}

export default Following