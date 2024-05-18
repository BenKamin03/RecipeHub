import React from "react";

import Home1 from "./sections/Home_1";
import Home2 from "./sections/Home_2.js";
import LoadingPage from "../../components/Loading.js";

const Home = () => {
	return (
		<div className="my-6 mx-24">
			<Home1 />
			<Home2 />
		</div>
	);
};

export default Home;
