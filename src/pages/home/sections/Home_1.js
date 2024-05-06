import React from "react";

import Button from "../../../components/Button.js";

const home_1 = () => {
	return (
		<div className="flex w-full">
			<div className="w-[60%] h-96 flex items-center">
				<div className="">
					<h1 className="text-5xl font-black mb-6">Huge selection of delicious recipe ideas</h1>
					<p className="mb-6">
						Explore our huge selection of delicious recipe ideas including: easy deserts, delicious vegan and vegetarian dinner
						ideas, gorgeous pasta recipes, quick bakes, family-friendly meals and gluten-free recipes
					</p>
					<div className="flex gap-4 w-full">
						<Button textColor={"white"} href="/" name="Top Rated" mainColor="black" borderColor="black" />
						<Button textColor={"gray-300"} href="/" name="Show Random" mainColor="white" borderColor="gray-300" />
					</div>
				</div>
			</div>
			<div className="bg-black w-[40%] rounded-3xl h-96"></div>
		</div>
	);
};

export default home_1;
