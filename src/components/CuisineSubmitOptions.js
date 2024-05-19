import React, { useEffect, useState } from 'react'
import Session from '../middleware/Session';

const CuisinesSearchOptions = ({ setCuisine }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonData = await Session.getCuisines();

                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='overflow-x-auto h-24 overflow-y-hidden'>
            <div className='flex flex-nowrap gap-1 h-full'>
                {data.map((cuisine, index) => (
                    <button
                        type='button'
                        className="transition ease-in-out relative h-full w-48 flex-shrink-0"
                        onClick={(e) => setCuisine(cuisine)}
                        key={index}
                    >
                        <img
                            src={cuisine.img}
                            className="h-full w-full rounded-md object-center object-cover bg-black"
                            alt={cuisine.name}
                        />
                        <div className='absolute left-0 top-0 rounded-md h-full w-full flex justify-center items-center text-white bg-black bg-opacity-60'>
                            <div className='w-full h-full flex justify-center items-center hover:scale-110 transition-all ease-in-out'>
                                <p>{cuisine.cuisine}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>

    )
}

export default CuisinesSearchOptions