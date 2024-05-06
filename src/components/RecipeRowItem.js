import React, { useState } from "react";

const RecipeRowItem = ({ recipe }) => {
	const [visible, setVisible] = useState(false);

	return (
		<div
			className="hover:scale-110 transition ease-in-out"
			onClick={(e) => {
				e.stopPropagation();
				window.location.href = recipe.href;
			}}
			onMouseOver={(e) => setVisible(true)}
			onMouseLeave={(e) => setVisible(false)}>
			<div className={"h-64 w-full bg-gray-500 rounded-md mr-4 bg-no-repeat bg-center bg-cover bg-[url('" + recipe.img + "')]"}>
				<div
					className={
						"h-full w-full flex items-center justify-center bg-black rounded-md transition ease-in-out " +
						(visible ? "bg-opacity-50 backdrop-blur-lg" : "bg-opacity-0")
					}>
					{visible && (
                              <div>
                                   <p className="text-center text-white mx-4 line-clamp-1 font-bold">{recipe.name}</p>
                                   <p className="text-white line-clamp-5 mx-2 text-center">{recipe.description}</p>
                                   {recipe.tags != null && <p className="text-center text-white opacity-50 mx-4 line-clamp-1 font-light text-sm">
                                        {recipe.tags.map((tag, index) => (
                                             <label className="mr-2" key={index}>#{tag}</label>
                                        ))}
                                   </p>}
						</div>
					)}
				</div>
			</div>
			<p className="text-center line-clamp-1 mx-4">{recipe.name}</p>
		</div>
	);
};

export default RecipeRowItem;
