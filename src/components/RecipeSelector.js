import React, { useState } from "react";
import Session from "../middleware/Session";

const RecipeRowItem = ({ recipe, selectRecipe }) => {
	const [visible, setVisible] = useState(false);

	const recipeData = Session.getRecipeFromID(recipe);

	return (
		<div
			className="hover:scale-110 hover:z-10 rounded-lg transition ease-in-out cursor-pointer"
			onClick={(e) => {
				selectRecipe(recipe)
			}}
			onMouseOver={(e) => setVisible(true)}
			onMouseLeave={(e) => setVisible(false)}>

			<div className={"h-64 relative w-full bg-gray-500 rounded-md mr-4 bg-no-repeat bg-center bg-cover"}>
				<img
					src={recipeData.img}
					className="h-full w-full rounded-md mr-4 object-center object-cover bg-black"
					alt={recipeData.name}
				/>
				<div
					className={
						"h-full absolute top-0 left-0 w-full flex items-center justify-center bg-black rounded-md transition ease-in-out " +
						(visible ? "bg-opacity-50 backdrop-blur-lg" : "bg-opacity-0")
					}>
					{visible && (
						<div>
							<p className="text-center text-white mx-4 line-clamp-1 font-bold">{recipeData.name}</p>
							<p className="text-white line-clamp-5 mx-2 text-center">{recipeData.description}</p>
							{recipeData.tags != null && <p className="text-center text-white opacity-50 mx-4 line-clamp-1 font-light text-sm">
								{recipeData.tags.map((tag, index) => (
									<label className="mr-2" key={index}>#{tag}</label>
								))}
							</p>}
						</div>
					)}
				</div>
			</div>
			<p className="text-center line-clamp-1 mx-4">{recipeData.name}</p>
		</div>
	);
};

export default RecipeRowItem;
