import React, { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Button from "../../../components/Button.js";
import Session from "../../../middleware/Session.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faShuffle } from "@fortawesome/free-solid-svg-icons";

const Home_1 = () => {

	const [cuisines, setCuisines] = useState([]);

	const [randomRecipe, setRandomRecipe] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await Session.getRandomRecipeID();
				console.log(response)
				setRandomRecipe(response);
				console.log(randomRecipe)
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const jsonData = await Session.getCuisines();

				setCuisines(jsonData);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="grid grid-cols-5 w-full ">
			<div className="col-span-3 flex items-center">
				<div className="">
					<h1 className="text-5xl font-black mb-6">Great selection of appetizing recipe options</h1>
					<p className="mb-6">
						Discover our extensive array of mouth-watering recipes, featuring easy desserts, delectable vegan and vegetarian dinners, stunning pasta dishes, quick bakes, and family-friendly meals.
					</p>
					<div className="flex gap-4 w-1/2">
						<div
							onClick={(e) => {
								Session.redirectTo(e, `/recipe?id=${randomRecipe}`)
							}}
							className={`cursor-pointer bg-black border-black text-white border-2 flex justify-center items-center text-xl rounded-md w-full h-12 hover:scale-110 transition-all ease-in-out`}>
							<FontAwesomeIcon icon={faShuffle} className="mr-2" />
							<p>Surprise Me</p>
						</div>
					</div>
				</div>
			</div>


			<img
				src="https://media.discordapp.net/attachments/500465447162871814/1241545406588911676/healthy-food-png-hd-eating-raw-foods-is-one-of-the-best-gifts-that-you-can-ever-give-to-yourself-4256-140204961.png?ex=664a96c3&is=66494543&hm=29018166a616369f716ef24b4ef00324ad26450c291e8d476e72ba84f0732655&=&format=webp&quality=lossless&width=1348&height=897"
				className="h-full w-full rounded-md mr-4 object-center object-contain col-span-2 aspect-square" />
		</div>
	);
};

export default Home_1;
