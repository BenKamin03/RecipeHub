import React, { useEffect, useState } from "react";
import Session from "../backend/Session";


const ExploreByCuisine = () => {

	const [cuisines, setCuisines] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const jsonData = await Session.getCuisines();

				const data = [];

				const addData = (arr) => {
					const addToData = (cuisine) => {
						for (let ele of jsonData) {
							if (ele.cuisine === cuisine) {
								data.push({ cuisine: ele.cuisine, img: ele.img });
							}
						}
					}

					for (let ele of arr) {
						addToData(ele);
					}
				}

				addData(["Thai", "American", "Chinese", "Mexican", "Indian", "Italian"])

				setCuisines(data);
			} catch {

			}
		}

		fetchData();
	}, [])

	return (
		<div className={`grid grid-cols-6 gap-2`}>
			{cuisines.map((cuisine, index) => (
				<button className="hover:scale-110 transition ease-in-out relative h-28"
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
	);
};

export default ExploreByCuisine;
