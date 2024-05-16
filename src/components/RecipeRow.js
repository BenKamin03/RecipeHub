import React from "react";
import RecipeRowItem from "./RecipeRowItem";

const RecipeRow = ({recipes}) => {

	return (
		<div className={`grid grid-cols-${recipes.length} gap-4`}>
			{recipes.map((recipe, index) => (
				<RecipeRowItem recipe={recipe} key={index} />
			))}
		</div>
	);
};

export default RecipeRow;
