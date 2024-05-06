import React, { useState } from "react";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const navOptions = [
    { text: "Home", href: "/" },
    { text: "Chefs", href: "/chefs"},
		{ text: "Submit", href: "/submit" },
		{ text: "Saved", href: "/saved" },
		{ text: "Search", href: "/search" },
	];

	return (
		<header className="sticky top-0 mx-24 bg-white p-4 grid grid-cols-3 items-center justify-center border-b-2 border-gray-100">
			<div className="flex items-center">
				<img className="h-8 w-8 mr-4" src="/path/to/logo.png" alt="Logo" />
				<h1>
					<b>RECIPE</b>HUB
				</h1>
			</div>
			<div className="hidden md:flex text-black items-center justify-center gap-8">
				{navOptions.map((nav, index) => (
					<a href={nav.href}>{nav.text}</a>
				))}
			</div>
			<div className="flex justify-end">
				<div className="hidden md:flex">
					<button className="px-3 py-1 rounded-md mr-4">Log In</button>
					<button className="px-3 py-1 rounded-md">Register</button>
				</div>
				<div className="md:hidden">
					<button onClick={toggleMenu} className="text-white">
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
						</svg>
					</button>
				</div>
			</div>
			<div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
				<div className="flex flex-col text-white mt-4">
					{navOptions.map((nav, index) => (
						<a href={nav.href}>{nav.text}</a>
					))}
				</div>
			</div>
		</header>
	);
};

export default Header;
