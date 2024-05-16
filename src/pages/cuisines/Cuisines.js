import React, { useEffect, useState } from 'react'
import Session from '../../backend/Session'



const Cuisines = () => {

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
		<div className='mx-24 my-6'>
			<h1 className='text-center text-xl pb-2'>Browse by Cuisine</h1>
			<div className='grid grid-cols-5 gap-2'>
				{data.map((cuisine, index) => (
					<button className="hover:scale-110 transition ease-in-out relative h-36"
						onClick={(e) => Session.redirectTo(e, `/browse?cuisine=${cuisine.cuisine.toLowerCase()}`)}
						key={index}>
						<img
							src={cuisine.img}
							className="h-full w-full rounded-md mr-4 object-center object-cover bg-black"
							alt={cuisine.name}
						/>
						<div className='absolute left-0 top-0 rounded-md h-full w-full flex justify-center items-center text-white hover:font-semibold bg-black bg-opacity-60'>
							<p>{cuisine.cuisine}</p>
						</div>
					</button>
				))}
			</div>
		</div>
	)
}

export default Cuisines