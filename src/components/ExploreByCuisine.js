import React from "react";

const ExploreByCuisine = () => {
	const cuisines = [
		{ name: "Thai", href: "", img: "" },
		{ name: "American", href: "", img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg" },
		{ name: "Chinese", href: "", img: "" },
		{ name: "Mexican", href: "", img: "" },
		{ name: "Indian", href: "", img: "" },
		{ name: "View All", href: "", img: "" },
	];

	return (
		<div className={`grid grid-cols-6 gap-2`}>
			{cuisines.map((cuisine, index) => (
				<button className="hover:scale-110 transition ease-in-out"
					onClick={(e) => {
						e.stopPropagation();
						window.location.href = cuisine.href;
					}}
                         key={index}>
                         <div className={"h-24 w-full bg-black rounded-md mr-4 bg-center bg-cover bg-[url('" + cuisine.img + "')]"}/>
					<p>{cuisine.name}</p>
				</button>
			))}
		</div>
	);
};

export default ExploreByCuisine;
