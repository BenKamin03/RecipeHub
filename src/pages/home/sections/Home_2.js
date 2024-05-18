import React from "react";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Cuisines from "../../../components/ExploreByCuisine.js";
import RecipeRow from "../../../components/RecipeRow.js";
import Session from "../../../middleware/Session.js";

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
		<div className="mb-24">
			<div className="flex justify-between">
				<h1 className=" mt-6 mb-4 text-xl font-semibold">Explore by Cuisine</h1>
				<button
					onClick={(e) => {
						e.stopPropagation();
						window.location.href = "/cuisines";
					}}
					className="flex  mt-6 text-xl font-semibold hover:scale-110 transition-all ease-in-out">
					<h1 className="">View More</h1>
					<FontAwesomeIcon className="mt-1 ml-2" icon={faArrowRight} />
				</button>
			</div>
			<Cuisines />
		</div>
	);
};

export default Home_2;
