import React, { useEffect, useState } from "react";

import Button from "../../components/Button.js";
import RecipeRow from "../../components/RecipeRow.js";
import PieChart from "../../components/PieChart.js";
import TopCuisines from "../../components/TopCuisines.js";
import RecipeGrid from "../../components/RecipeGrid.js";

const Profile = () => {
	const [recipes, setRecipes] = useState([]);

	const profile = {
          username: "Username",
          bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
		profilePhotot: "",
		showcase: [
			{
				name: "Tri-Tip Steak",
				href: "",
				img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
				cuisine: "American",
				tags: ["Steak", "Tri-Tip Steak", "Garlic", "Peppers", "American"],
			},
			{
				name: "Tri-Tip Steak",
				href: "",
				img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
				cuisine: "American",
				tags: ["Steak", "Tri-Tip Steak", "Garlic"],
			},
			{
				name: "Tri-Tip Steak",
				href: "",
				img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
				cuisine: "American",
				tags: ["Steak", "Tri-Tip Steak", "Garlic"],
			},
		],
		cuisineData: Array.from({ length: 50 }, () => Math.floor(Math.random() * 1.1)),
		allRecipes: [
			{
				name: "Tri-Tip Steak",
				href: "",
				img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
				cuisine: "American",
				tags: ["Steak", "Tri-Tip Steak", "Garlic"],
			},
			{
				name: "Tri-Tip Steak",
				href: "",
				img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
				cuisine: "American",
				tags: ["Steak", "Tri-Tip Steak", "Garlic"],
			},
			{
				name: "Tri-Tip Steak",
				href: "",
				img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
				cuisine: "American",
				tags: ["Steak", "Tri-Tip Steak", "Garlic"],
			},
			{
				name: "Tri-Tip Steak",
				href: "",
				img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
				cuisine: "American",
				tags: ["Steak", "Tri-Tip Steak", "Garlic"],
			},
			{
				name: "Tri-Tip Steak",
				href: "",
				img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
				cuisine: "American",
				tags: ["Steak", "Tri-Tip Steak", "Garlic"],
			},
			{
				name: "Tri-Tip Steak",
				href: "",
				img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
				cuisine: "American",
				tags: ["Steak", "Tri-Tip Steak", "Garlic"],
			},
			{
				name: "Tri-Tip Steak",
				href: "",
				img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
				cuisine: "American",
				tags: ["Steak", "Tri-Tip Steak", "Garlic"],
			},
			{
				name: "Tri-Tip Steak",
				href: "",
				img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
				cuisine: "American",
				tags: ["Steak", "Tri-Tip Steak", "Garlic"],
			},
			{
				name: "Tri-Tip Steak",
				href: "",
				img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
				cuisine: "American",
				tags: ["Steak", "Tri-Tip Steak", "Garlic"],
			},
			{
				name: "Tri-Tip Steak",
				href: "",
				img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
				cuisine: "American",
				tags: ["Steak", "Tri-Tip Steak", "Garlic"],
			},
			{
				name: "Tri-Tip Steak",
				href: "",
				img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
				cuisine: "American",
				tags: ["Steak", "Tri-Tip Steak", "Garlic"],
			},
		],
	};

	return (
		<div className="mx-24 h-full">
			<div className="flex flex-rows gap-8">
				<div className="bg-slate-100 h-full w-[30%]">
					<div className="flex justify-center items-center flex-col gap-2">
						<div className="w-full aspect-square bg-white rounded-full" />
						<h1 className="text-center text-xl font-semibold">{profile.username}</h1>
                              <Button textColor={"white"} href="/" name="Edit Profile" mainColor="black" borderColor="black" />
                              <p className="mx-2">{profile.bio}</p>
					</div>
				</div>
				<div className="w-[70%]">
					<div>
						<h1 className="mb-2 mt-6 text-xl font-semibold">Showcase</h1>
						<RecipeRow recipes={profile.showcase} />
					</div>
					<div className="">
						<h1 className="mb-2 mt-6 text-xl font-semibold">Cuisine Breakdown</h1>
						<div className="flex flex-row border-2 border-black rounded-md p-4">
							<div className="h-min w-full">
								<div className="flex w-full justify-center flex-row items-center gap-10">
									<PieChart cuisineData={profile.cuisineData} />
									<TopCuisines cuisineData={profile.cuisineData} />
								</div>
							</div>
						</div>
					</div>
					<div>
						<h1 className="mb-2 mt-6 text-xl font-semibold">All Recipes</h1>
						<RecipeGrid recipes={profile.allRecipes} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
