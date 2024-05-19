import { faCircle, faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Session from "../middleware/Session";

const RecipeRowItem = ({ recipe }) => {
	const [visible, setVisible] = useState(false);

	const [profilePic, setProfilePic] = useState("");

	useEffect(() => {
        const fetchData = async () => {
            try {
                setProfilePic((await Session.getProfile(recipe.author)).img);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

	function convertToHoursAndMinutes(minutes) {
        if (minutes < 0) {
            throw new Error('Input must be a non-negative number of minutes.');
        }
    
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
    
        let result = '';
    
        if (hours > 0) {
            result += `${hours}h`;
        }
    
        if (hours > 0 && remainingMinutes < 10) {
            result += ' 0';
        }
    
        if (remainingMinutes > 0 || result === '') {
            result += `${remainingMinutes}m`;
        }
    
        return result;
    }

	return (
		<div
			className="hover:scale-110 transition ease-in-out cursor-pointer"
			onClick={(e) => {
				e.stopPropagation();
				window.location.href = "/recipe?id=" + recipe.id;
			}}
			onMouseOver={(e) => setVisible(true)}
			onMouseLeave={(e) => setVisible(false)}>

			<div className={"h-64 relative w-full bg-gray-500 rounded-md mr-4 bg-no-repeat bg-center bg-cover"}>
				<img
					src={recipe.img}
					className="h-full w-full rounded-md mr-4 object-center object-cover bg-black"
					alt={recipe.name}
				/>
				<div
					className={
						"h-full absolute top-0 left-0 w-full flex items-center justify-center bg-black rounded-md transition ease-in-out " +
						(visible ? "bg-opacity-50 backdrop-blur-lg" : "bg-opacity-0")
					}>
					{visible && (
						<div>
							<div className='flex flex-row h-min justify-center content-center my-2'>
								<a href={`/profile?name=${recipe.author}`} className='flex flex-row justify-center content-center text-white'>
									<div className='bg-black aspect-square h-10 rounded-full'>
										<img
											src={profilePic}
											className="h-full w-full rounded-full mr-4 object-center object-cover bg-black"
											alt="Profile"
										/>
									</div>
									<h1 className='align-middle p-2'>{recipe.author}</h1>
								</a>
							</div>
							<p className="text-center text-white mx-4 line-clamp-1 font-bold">{recipe.name}</p>
							<p className="text-white line-clamp-5 mx-2 text-center">{recipe.description}</p>
							{recipe.tags != null && <p className="text-center text-white opacity-50 mx-4 line-clamp-1 font-light text-sm">
								{recipe.tags.map((tag, index) => (
									<label className="mr-2" key={index}>#{tag}</label>
								))}
							</p>}
							<div className="flex flex-row justify-center content-center text-white opacity-75">
								<p className="text-center">
									<FontAwesomeIcon className="mr-2" icon={faClock} />{convertToHoursAndMinutes(recipe.cookTime)}
								</p>

								<div className="w-2 h-2 rounded-full bg-white m-2" />

								<p className="text-center">
									{recipe.servings} Serving{recipe.servings > 1 && "s"}
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
			<p className="text-center line-clamp-1 mx-4">{recipe.name}</p>
		</div>
	);
};

export default RecipeRowItem;
