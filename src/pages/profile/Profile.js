import React, { useState } from "react";

import Button from "../../components/Button.js";
import RecipeRow from "../../components/RecipeRow.js";
import PieChart from "../../components/PieChart.js";
import TopCuisines from "../../components/TopCuisines.js";
import RecipeGrid from "../../components/RecipeGrid.js";
import Session from "../../backend/Session.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserMinus, faEdit, faCog, faSign, faSignIn, faRegistered, faPlusSquare } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
	const queries = Session.getQueries();

	if (!queries || !queries.name) {
		Session.redirectTo("/")
	}

	let profile = Session.getProfile(queries.name);

	let session = Session.getSessionData();

	let isLoggedIn = Session.isLoggedIn();

		let isSelf = false;

	if (isLoggedIn) {
		isSelf = isLoggedIn && Session.getSessionData().username === profile.username || false;
		setTimeout(0, () => setIsFollowing((((Session.getProfile(Session.getSessionData().username)).following.includes(profile.username)))));
	}

	const checkIsFollowing = () => {
		if (!isSelf) {
			const userFollowers = Session.getProfile(Session.getSessionData().username).following;
			return(userFollowers.findIndex((name) => name == profile.username) != -1);
		} else {
			return(false);
		}
	}

	const updateFollowing = () => {
		setIsFollowing(checkIsFollowing());
	}

	const [isFollowing, setIsFollowing] = useState(checkIsFollowing());

	const showcase = [];

	for (let id of profile.showcase) {
		showcase.push(Session.getRecipeFromID(id));
	}

	const allRecipes = [];

	for (let id of profile.allRecipes) {
		allRecipes.push(Session.getRecipeFromID(id));
	}

	return (
		<div className="mx-24">
			<div className="grid grid-cols-4 gap-16">
				<div className=" h-full p-4 border-r-2">
					<div className="flex justify-center items-center flex-col gap-2">
						<div className="w-full aspect-square bg-gray-500 rounded-full">
							<img
								src={profile.img}
								className="h-full w-full rounded-full mr-4 object-center object-cover bg-black"
								alt="Profile"
							/>
						</div>
						<h1 className="text-center text-xl font-semibold">{profile.username}</h1>
						<a href={`/following?name=${profile.username}`} className="flex flex-row gap-4 cursor-pointer">
							<p className="font-extrabold">{profile.followers.length} <label className="font-light cursor-pointer">Follower{profile.followers.length !== 1 && "s"}</label></p>
							<p className="font-extrabold">{profile.following.length} <label className="font-light cursor-pointer">Following</label></p>
						</a>
						{isLoggedIn ?
							<div className="w-full">
								{isSelf ?
									<div className="w-full flex flex-row gap-2">
										<div
											onClick={(e) => {
												Session.redirectTo(e, "/edit-profile")
											}}
											className={`cursor-pointer relative bg-black border-black text-white border-2 flex justify-center items-center rounded-md w-full h-12 hover:scale-110 transition-all ease-in-out gap-4`}>
											<FontAwesomeIcon className="absolute left-0 ml-3" icon={faEdit} />{<p>Edit</p>}
										</div>
										<div
											onClick={(e) => {
												Session.redirectTo(e, "/settings")
											}}
											className={`cursor-pointer bg-black border-black text-white border-2 flex justify-center items-center w-12 rounded-md hover:scale-110 transition-all ease-in-out`}>
											<FontAwesomeIcon className="text-xl" icon={faCog} />
										</div>
									</div>
									:
									<div
										onClick={(e) => {
											Session.toggleFollow(profile.username, [updateFollowing])
										}}
										className={`cursor-pointer relative bg-black border-black text-white border-2 flex justify-center items-center rounded-md w-full h-12 hover:scale-110 transition-all ease-in-out gap-4`}>
										<FontAwesomeIcon className="absolute left-0 ml-3" icon={isFollowing ? faUserMinus : faUserPlus} />{isFollowing ? <p>Unfollow</p> : <p>Follow</p>}
									</div>
								}
							</div>
							:
							<div className="w-full flex flex-row gap-1">
								<div
									onClick={(e) => {
										Session.redirectTo(e, "/login")
									}}
									className={`cursor-pointer relative bg-black border-black text-white border-2 flex justify-center items-center rounded-md w-full h-12 hover:scale-110 transition-all ease-in-out gap-4`}>
									<FontAwesomeIcon className="absolute left-0 ml-3" icon={faSignIn} /><p>Log In</p>
								</div>
								<div
									onClick={(e) => {
										Session.redirectTo(e, "/register")
									}}
									className={`cursor-pointer relative bg-black border-black text-white border-2 flex justify-center items-center rounded-md w-full h-12 hover:scale-110 transition-all ease-in-out gap-4`}>
									<FontAwesomeIcon className="absolute left-0 ml-3" icon={faPlusSquare} /><p>Register</p>
								</div>
							</div>}
						<p className="mx-2 text-center">{profile.bio}</p>
					</div>
				</div>
				<div className="col-span-3">
					<div>
						<h1 className="mb-2 mt-6 text-xl font-semibold">Showcase</h1>
						<RecipeRow recipes={showcase} />
					</div>
					{profile.allRecipes.length > 0 &&
						<div className="">
							<h1 className="mb-2 mt-6 text-xl font-semibold">Cuisine Breakdown</h1>
							<div className="flex flex-row border-2 border-black rounded-md p-4">
								<div className="h-min w-full">
									<div className="flex w-full justify-center flex-row items-center gap-10">
										<PieChart allRecipes={allRecipes} />
										<TopCuisines max={5} allRecipes={allRecipes} />
									</div>
								</div>
							</div>
						</div>
					}
					<div>
						<h1 className="mb-2 mt-6 text-xl font-semibold">All Recipes</h1>
						<RecipeGrid recipes={allRecipes} />
					</div>
				</div>
			</div>
		</div >
	);
};

export default Profile;
