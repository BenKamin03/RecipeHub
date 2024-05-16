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
		<div>
			{convertToDoubleArray(recipes, 3).map((row, index) => (
				<div className="my-4" key={index}>
					<RecipeRow key={index} recipes={row} />
				</div>
			))}
		</div>
	);
};

export default RecipeGrid;
