import React, { useEffect, useState } from "react";

import Button from "../../components/Button.js";
import RecipeRow from "../../components/RecipeRow.js";
import PieChart from "../../components/PieChart.js";
import TopCuisines from "../../components/TopCuisines.js";
import RecipeGrid from "../../components/RecipeGrid.js";
import Session from "../../middleware/Session.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserMinus, faEdit, faCog, faSign, faSignIn, faRegistered, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "../../components/Loading.js";

const Profile = () => {
	const queries = Session.getQueries();


	if (!queries || !queries.name) {
		Session.redirectTo("/")
	}

	const session = Session.getSessionData();
	const isLoggedIn = Session.isLoggedIn();

	const [profile, setProfile] = useState(null);
	const [isSelf, setIsSelf] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);
	const [showcase, setShowcase] = useState([]);
	const [allRecipes, setAllRecipes] = useState([]);
	const [toggleFollow, setToggleFollow] = useState(0);
	const [followers, setFollowers] = useState(0);
	const [following, setFollowing] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await Session.getProfile(queries.name);

				if (response == null) {
					Session.redirectTo(null, "/");
				}

				const l_showcase = [];

				for (let id of response.showcase) {

					if (id !== null) {
						console.log(id)
						const rec = await Session.getRecipeFromID(id);
						console.log(rec)
						if (rec !== null && Object.keys(rec).length !== 0) {

							l_showcase.push(rec);
						}
					}
				}

				setShowcase(l_showcase);

				console.log(showcase)

				const l_allRecipes = [];

				console.log(l_showcase);

				for (let id of response.allRecipes) {
					console.log(id);
					l_allRecipes.push(await Session.getRecipeFromID(id));
				}

				setAllRecipes(l_allRecipes);

				setFollowers(response.followers.length);
				setFollowing(response.following.length);

				console.log(response)

				setProfile(response);

				if (isLoggedIn) {
					setIsSelf(isLoggedIn && Session.getSessionData().name === response.name || false);
					setTimeout(0, () => setIsFollowing((((Session.getProfile(Session.getSessionData().name)).following.includes(response.name)))));
					if (!(isLoggedIn && Session.getSessionData().name === response.name || false))
						if (!isSelf) {
							const userFollowers = (await Session.getProfile(Session.getSessionData().name)).following;
							setIsFollowing(userFollowers.findIndex((name) => name == response.name) != -1);
						} else {
							setIsFollowing(false);
						}
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			if (Session.isLoggedIn() && profile != null) {
				setIsFollowing(await Session.toggleFollow(profile.name));

				const response = await Session.getProfile(queries.name);

				setFollowers(response.followers.length);
				setFollowing(response.following.length);
			} else
				setIsFollowing(false);
		}

		fetchData();
	}, [toggleFollow, profile])


	return (
		<div className="mx-24">
			{profile !== null ?
				<div className="grid grid-cols-4 gap-16">
					<div className=" h-full p-4 border-r-2">
						<div className="flex justify-center items-center flex-col gap-2">
							<div className="w-full aspect-square bg-gray-500 rounded-full">
								<img
									src={profile.img}
									className="h-full w-full rounded-full aspect-square mr-4 object-center object-cover bg-black"
									alt="Profile"
								/>
							</div>
							<h1 className="text-center text-xl font-semibold">{profile.name}</h1>
							<a href={`/following?name=${profile.name}`} className="flex flex-row gap-4 cursor-pointer">
								<p className="font-extrabold">{followers} <label className="font-light cursor-pointer">Follower{followers !== 1 && "s"}</label></p>
								<p className="font-extrabold">{following} <label className="font-light cursor-pointer">Following</label></p>
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
												setToggleFollow(toggleFollow + 1);
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
						{showcase.length > 0 &&
							<div>
								<h1 className="mb-2 mt-6 text-xl font-semibold">Showcase</h1>
								<RecipeRow recipes={showcase} />
							</div>
						}
						{allRecipes.length > 0 &&
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
						{allRecipes.length > 0 &&
							<div>
								<h1 className="mb-2 mt-6 text-xl font-semibold">All Recipes</h1>
								<RecipeGrid recipes={allRecipes} />
							</div>
						}

						{allRecipes.length === 0 &&
							<div className="w-full h-full flex items-center justify-center">
								<h1 className="">
									No Recipes Yet
								</h1>
							</div>
						}
					</div>
				</div>
				:
				<LoadingPage />
			}
		</div >
	);
};

export default Profile;
