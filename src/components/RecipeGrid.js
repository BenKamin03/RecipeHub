import React from "react";

import RecipeRow from "./RecipeRow";

const RecipeGrid = ({ recipes, cols }) => {

     const convertToDoubleArray = (array, rowSize) => {
		const doubleArray = [];
		let tempArray = [];
		for (let i = 0; i < array.length; i++) {
			tempArray.push(array[i]);
			if (tempArray.length === rowSize || i === array.length - 1) {
				doubleArray.push(tempArray);
				tempArray = [];
			}
		}
		return doubleArray;
	};

	return (
		<div className={``}>
			{convertToDoubleArray(recipes, 3).map((row, index) => (
				<RecipeRow key={index} recipes={row} />
			))}
		</div>
	);
};

export default RecipeGrid;
