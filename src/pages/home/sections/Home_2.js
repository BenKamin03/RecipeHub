import React from "react";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Cuisines from "../../../components/ExploreByCuisine.js";
import RecipeRow from "../../../components/RecipeRow.js";

const Home_2 = () => {
	const trendingRecipes = [
		{
			name: "Tri-Tip Steak",
			href: "",
			img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
			description:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
               cuisine: "American",
               tags: ["Steak", "Tri-Tip Steak", "Garlic"],
		},
		{ name: "Recipe 2", href: "", img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg" },
		{ name: "Recipe 3", href: "", img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg" },
		{ name: "Recipe 4", href: "", img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg" },
		{ name: "Recipe 5", href: "", img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg" },
	];

	const bestRecipes = [
		{
			name: "Recipe 1",
			href: "",
			img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
			description: "best test description",
		},
		{ name: "Recipe 2", href: "", img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg" },
		{ name: "Recipe 3", href: "", img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg" },
		{ name: "Recipe 4", href: "", img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg" },
		{ name: "Recipe 5", href: "", img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg" },
	];

	const latestRecipes = [
		{
			name: "Recipe 1",
			href: "",
			img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
			description: "latest test description",
		},
		{ name: "Recipe 2", href: "", img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg" },
		{ name: "Recipe 3", href: "", img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg" },
		{ name: "Recipe 4", href: "", img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg" },
		{ name: "Recipe 5", href: "", img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg" },
	];

	return (
		<div>
			<div className="flex justify-between">
				<h1 className="mb-2 mt-6 text-xl font-semiboldbold">Explore by Cuisine</h1>
				<button
					onClick={(e) => {
						e.stopPropagation();
						window.location.href = "/cuisines";
					}}
					className="flex mb-2 mt-6 text-xl font-semiboldbold hover:scale-110 transition-all ease-in-out">
					<h1 className="">View More</h1>
					<FontAwesomeIcon className="mt-1 ml-2" icon={faArrowRight} />
				</button>
			</div>
			<Cuisines />

			<div className="flex justify-between">
				<h1 className="mb-2 mt-6 text-xl font-semibold">Trending Recipes</h1>
				<button
					onClick={(e) => {
						e.stopPropagation();
						window.location.href = "/trending";
					}}
					className="flex mb-2 mt-6 text-xl font-semiboldbold hover:scale-110 transition-all ease-in-out">
					<h1 className="">View More</h1>
					<FontAwesomeIcon className="mt-1 ml-2" icon={faArrowRight} />
				</button>
			</div>
			<RecipeRow recipes={trendingRecipes} />

			<div className="flex justify-between">
				<h1 className="mb-2 mt-6 text-xl font-semibold">Best Recipes</h1>
				<button
					onClick={(e) => {
						e.stopPropagation();
						window.location.href = "/best";
					}}
					className="flex mb-2 mt-6 text-xl font-semiboldbold hover:scale-110 transition-all ease-in-out">
					<h1 className="">View More</h1>
					<FontAwesomeIcon className="mt-1 ml-2" icon={faArrowRight} />
				</button>
			</div>
			<RecipeRow recipes={bestRecipes} />

			<div className="flex justify-between">
				<h1 className="mb-2 mt-6 text-xl font-semibold">Latest Recipes</h1>
				<button
					onClick={(e) => {
						e.stopPropagation();
						window.location.href = "/latest";
					}}
					className="flex mb-2 mt-6 text-xl font-semiboldbold hover:scale-110 transition-all ease-in-out">
					<h1 className="">View More</h1>
					<FontAwesomeIcon className="mt-1 ml-2" icon={faArrowRight} />
				</button>
			</div>
			<RecipeRow recipes={latestRecipes} />
		</div>
	);
};

export default Home_2;
