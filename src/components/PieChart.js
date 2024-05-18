import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import Session from "../middleware/Session";

const PieChart = ({ allRecipes }) => {
	const chartRef = useRef(null);
	const [data, setData] = useState(null);

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
					for (let d in data) {
						if (data[d].label == recipe.cuisine) {
							data[d].value++;
						}
					}
				})

				setData(data);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (chartRef.current && data) {
			const ctx = chartRef.current.getContext("2d");
			const labels = data.map((item) => item.label);
			const values = data.map((item) => item.value);
			const colors = data.map((item) => item.backgroundColor);

			const myChart = new Chart(ctx, {
				type: "pie",
				data: {
					labels: labels,
					datasets: [
						{
							data: values,
							backgroundColor: colors,
						},
					],
				},
				options: {
					plugins: {
						tooltip: {
							callbacks: {
								label: function (context) {
									const label = context.label || "";
									const value = context.parsed || "";
									return `${label}: ${value}`;
								},
							},
						},
						legend: {
							display: false,
						},
					},
					responsive: true,
					maintainAspectRatio: false,
				},
			});

			return () => {
				myChart.destroy();
			};
		}
	}, [chartRef, data]);

	return (
		<div className="w-min">
			<canvas ref={chartRef}></canvas>
		</div>
	);
};

export default PieChart;
