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
				src="https://media.discordapp.net/attachments/500465447162871814/1241545406588911676/healthy-food-png-hd-eating-raw-foods-is-one-of-the-best-gifts-that-you-can-ever-give-to-yourself-4256-140204961.png?ex=664a96c3&is=66494543&hm=29018166a616369f716ef24b4ef00324ad26450c291e8d476e72ba84f0732655&=&format=webp&quality=lossless&width=1348&height=897"
				className="h-full w-full rounded-md mr-4 object-center object-contain col-span-2 aspect-square" />
		</div>
	);
};

export default Home_1;
