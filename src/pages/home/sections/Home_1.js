import React, { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Button from "../../../components/Button.js";
import Session from "../../../middleware/Session.js";

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
					<h1 className="text-5xl font-black mb-6">Huge selection of delicious recipe ideas</h1>
					<p className="mb-6">
						Explore our huge selection of delicious recipe ideas including: easy deserts, delicious vegan and vegetarian dinner
						ideas, gorgeous pasta recipes, quick bakes, family-friendly meals and gluten-free recipes
					</p>
					<div className="flex gap-4 w-1/2">
						<Button textColor={"white"} href={`/recipe?id=${randomRecipe}`} name="I'm Feeling Lucky" mainColor="black" borderColor="black" />
						
					</div>
				</div>
			</div>


			<img
				src="https://assets-global.website-files.com/64d8e1941fab27b22290703e/65157cf16020f5e6e4109c39_baby-egg-roll.png"
				className="h-full w-full rounded-md mr-4 object-center object-contain col-span-2 aspect-square" />






			{/* <img
						src={cuisines[currCuisine ? currCuisine : 0].img}
						className="h-full w-full rounded-3xl mr-4 object-center object-cover bg-black"
						alt="Profile"
					/> */}
		</div>
	);
};

export default Home_1;
