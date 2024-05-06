import React, { useState, useEffect } from "react";

const TopCuisines = ({ cuisineData }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/data/cuisines.json");
				const jsonData = await response.json();

				const cuisineObjectArray = jsonData.map((item, index) => ({
					label: item.cuisine,
					value: cuisineData[index],
					backgroundColor: item.color,
				}));

				const sortedData = cuisineObjectArray.sort((a, b) => {
					if (a.value !== b.value) {
						return b.value - a.value;
					} else {
						return a.label.localeCompare(b.label);
					}
				});

				console.log(sortedData);

				setData(sortedData);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};
		fetchData();
	}, [cuisineData]);

	return (
		<div className="flex flex-row gap-4">
			<div className="gap-2 flex flex-col">
				{data
					.filter((item) => item.value > 0)
					.slice(0, 5)
					.map((d, index) => (
						<div className="bg-slate-400 flex flex-row justify-between gap-12 p-2 rounded-md">
							<p>{d.label}</p>
							<p>{d.value}</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default TopCuisines;
