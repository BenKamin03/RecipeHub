import React, { useState } from "react";
import Session from "../backend/Session";
import ProfileHeader from "./ProfileHeader";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const [isLoggedIn, setIsLoggedIn] = useState(Session.isLoggedIn());

	Session.addSessionListener(setIsLoggedIn);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const navOptions = [
		{ text: "Home", href: "/" },
		{ text: "Chefs", href: "/chefs" },
		{ text: "Submit", href: "/submit" },
		{ text: "Saved", href: "/saved" },
		{ text: "Browse", href: "/browse" },
	];

	if (!Session.isLoggedIn()) {
		navOptions.splice(2, 2)
	}

	return (
		<header className="sticky z-50 top-0 px-24 bg-white items-center justify-center">
			<div className="border-b-2 border-gray-100 grid grid-cols-3  p-4">
				<div onClick={(e) => Session.redirectTo(e, "/")} className="flex items-center cursor-pointer">
					<img className="h-10 w-min mr-4" src="/recipehub/logo.png" alt="Logo" />
				</div>
				<div className="hidden md:flex text-black items-center justify-center gap-8">
					{navOptions.map((nav, index) => (
						<a href={nav.href} key={index}>{nav.text}</a>
					))}
				</div>
				<div className="flex justify-end">
					{isLoggedIn ?
						<ProfileHeader /> :
						(<div className="hidden md:flex">
							<a className="px-3 py-1 rounded-md mr-4" href="/login">Log In</a>
							<a className="px-3 py-1 rounded-md" href="/register">Register</a>
						</div>
						)}
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
							<a href={nav.href} key={index}>{nav.text}</a>
						))}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
