import React, { useState, useEffect } from "react";
import Session from "../middleware/Session";

const TopCuisines = ({ allRecipes, max }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const jsonData = await Session.getCuisines();

				const data = jsonData.map((item, index) => ({
					label: item.cuisine,
					value: 0, // Random number between 0 and 100
					backgroundColor: item.color,
				}));

				allRecipes.map((recipe, index) => {
					data.map((d, index) => {
						if (d.label == recipe.cuisine) {
							d.value++;
						}
					})
				})

				const sortedData = data.sort((a, b) => {
					if (a.value !== b.value) {
						return b.value - a.value;
					} else {
						return a.label.localeCompare(b.label);
					}
				});

				setData(sortedData);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};
		fetchData();
	}, []);

	const getGrayScaleValue = (color) => {
		
	}

	return (
		<div className="flex flex-row gap-4">
			<div className="gap-2 flex flex-col">
				{data
					.filter((item) => item.value > 0)
					.slice(0, max)
					.map((d, index) => (
						<div key={index} className={`flex flex-row justify-between gap-12 p-2 rounded-md`} style={{backgroundColor: d.backgroundColor}}>
							<p>{d.label}</p>
							<p>{d.value}</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default TopCuisines;
