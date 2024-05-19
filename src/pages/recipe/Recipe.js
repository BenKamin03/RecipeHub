import React, { useEffect, useState } from 'react'
import Session from '../../middleware/Session'
import Ingredient from '../../components/Ingredient';
import Comment from '../../components/Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faTrash, faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faClock, faStar as outlineStar } from '@fortawesome/free-regular-svg-icons';
import LoadingPage from '../../components/Loading';

const Recipe = () => {

    const queries = Session.getQueries();

    if (!queries || !queries.id) {
        Session.redirectTo("/")
    }

    const [recipe, setRecipe] = useState(null);
    const [isSelf, setIsSelf] = useState(false);
    const [isHoveringSaved, setIsHoveringSaved] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [profilePic, setProfilePic] = useState("");
    const [rating, setRecipeRating] = useState(4);
    const [update, setUpdateRecipe] = useState(0);

    const updateRecipe = () => {
        setUpdateRecipe(update + 1);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Session.getRecipeFromID(queries.id);

                console.log(response);

                if (response == null) {
                    Session.redirectTo(null, "/");
                }

                if (Session.isLoggedIn()) {
                    setIsSelf(Session.getSessionData().name === response.author)

                    const selfProfile = await Session.getProfile(Session.getSessionData().name);
                    setIsSaved(selfProfile.saved.includes(queries.id))
                    console.log(isSaved);
                }
                setProfilePic((await Session.getProfile(response.author)).img);

                let r = 0
                for (let comment of response.comments) {
                    r += comment.rating / response.comments.length
                }
                setRecipeRating(Math.round(r * 10) / 10);

                setRecipe(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [update]);

    const updateSaved = async () => {
        setIsSaved(await Session.toggleSaved(queries.id));
        console.log(isSaved);
    }

    const [comment, setComment] = useState("");
    const [commentRating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(-1);

    const addComment = async () => {
        if (comment.length > 0) {
            await Session.addComment(recipe, {rating: commentRating, message: comment, name: Session.getSessionData().name});
            updateRecipe()
            setComment("")
        }
    }

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
        <div className='mx-24 my-12'>
            {recipe !== null ?
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-row w-full'>
                        <div className='w-1/2 p-4 border-r-2 '>
                            <div className='rounded-lg bg-black aspect-square relative'>
                                <img
                                    src={recipe.img}
                                    className="h-full w-full rounded-md mr-4 object-center object-cover bg-black"
                                    alt={recipe.name}
                                />
                                <p className=' text-white absolute top-4 right-4 text-5xl'>
                                    {Array.apply(null, { length: Math.round(rating) }).map((e, i) => (
                                        <label key={i}>
                                            <FontAwesomeIcon icon={solidStar} />
                                        </label>
                                    ))}
                                    {Array.apply(null, { length: 5 - Math.round(rating) }).map((e, i) => (
                                        <label key={i}>
                                            <FontAwesomeIcon icon={outlineStar} />
                                        </label>
                                    ))}
                                </p>
                            </div>
                        </div>
                        <div className='w-1/2 p-4'>
                            <div className='aspect-square overflow-auto'>
                                <div className='flex flex-row justify-center'>
                                    <h1 className='text-center font-semibold text-3xl mt-4 flex flex-row'>
                                        {!isSelf && Session.isLoggedIn() &&
                                            <div className='text-yellow-500 mr-2 cursor-pointer' onMouseOver={(e) => setIsHoveringSaved(true)} onMouseLeave={(e) => setIsHoveringSaved(false)} onClick={(e) => updateSaved()}>
                                                {(isSaved ? !isHoveringSaved : isHoveringSaved) ?
                                                    <FontAwesomeIcon icon={solidStar} />
                                                    :
                                                    <FontAwesomeIcon icon={outlineStar} />
                                                }
                                            </div>
                                        }
                                        {recipe.name}
                                    </h1>
                                </div>
                                <div className="flex flex-row justify-center content-center text-black opacity-75">
                                    <p className="text-center">
                                        <FontAwesomeIcon className="mr-2" icon={faClock} />{convertToHoursAndMinutes(recipe.cookTime)}
                                    </p>

                                    <div className="w-2 h-2 rounded-full bg-black m-2" />

                                    <p className="text-center">
                                        {recipe.servings} Serving{recipe.servings > 1 && "s"}
                                    </p>
                                </div>
                                <div className='flex flex-row h-min justify-center content-center my-2'>
                                    <a href={`/profile?name=${recipe.author}`} className='flex flex-row justify-center content-center'>
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

                                {recipe.tags != null && <p className="text-center opacity-50 mx-4 font-light text-sm">
                                    {recipe.tags.map((tag, index) => (
                                        <label className="mr-2" key={index}>#{tag}</label>
                                    ))}
                                </p>}
                                <p className='text-center mb-4'>{recipe.description}</p>
                                <h1 className='text-center text-xl my-2'>Ingredients</h1>
                                <div className='grid grid-cols-3'>
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <Ingredient key={index} ingredient={ingredient} />
                                    ))}
                                </div>
                                <h1 className='text-center text-xl my-2'>Instructions</h1>
                                <p className='text-center'>{recipe && recipe.instructions.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                                </p>
                            </div>
                        </div>
                    </div>
                    {isSelf &&
                        <button
                            type="button"
                            onClick={(e) => {
                                if (window.confirm("Confirm Delete Recipe?")) {
                                    Session.removeRecipe(recipe);
                                }
                            }}
                            className="text-white mt-1 w-full py-6 rounded bg-red-500 hover:bg-red-600 transition ease-in-out">
                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                            Remove
                        </button>
                    }

                    <div className='border-t-2 w-full flex justify-center items-center mt-8'>
                        <div className='w-2/3'>
                            <h1 className='text-center text-xl my-4'>Comments</h1>

                            <div className='relative'>
                                <textarea
                                    type="text"
                                    name="comment"
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                                    className={`resize-none text-center w-full pb-16 border-2 ${comment.length > 0 && "border-black"} rounded-lg`}
                                    placeholder="Comment"
                                />
                                <div className='absolute bottom-4 right-2 text-lg flex flex-row cursor-pointer'>
                                    <FontAwesomeIcon onClick={(e) => setRating(1)} onMouseEnter={(e) => setHoverRating(1)} onMouseLeave={(e) => setHoverRating(-1)} icon={(hoverRating !== -1 ? hoverRating : commentRating) >= 1 ? faStar : outlineStar} />
                                    <FontAwesomeIcon onClick={(e) => setRating(2)} onMouseEnter={(e) => setHoverRating(2)} onMouseLeave={(e) => setHoverRating(-1)} icon={(hoverRating !== -1 ? hoverRating : commentRating) >= 2 ? faStar : outlineStar} />
                                    <FontAwesomeIcon onClick={(e) => setRating(3)} onMouseEnter={(e) => setHoverRating(3)} onMouseLeave={(e) => setHoverRating(-1)} icon={(hoverRating !== -1 ? hoverRating : commentRating) >= 3 ? faStar : outlineStar} />
                                    <FontAwesomeIcon onClick={(e) => setRating(4)} onMouseEnter={(e) => setHoverRating(4)} onMouseLeave={(e) => setHoverRating(-1)} icon={(hoverRating !== -1 ? hoverRating : commentRating) >= 4 ? faStar : outlineStar} />
                                    <FontAwesomeIcon onClick={(e) => setRating(5)} onMouseEnter={(e) => setHoverRating(5)} onMouseLeave={(e) => setHoverRating(-1)} icon={(hoverRating !== -1 ? hoverRating : commentRating) >= 5 ? faStar : outlineStar} />
                                </div>
                                <FontAwesomeIcon onClick={(e) => addComment()} className={`absolute top-2 right-2 p-2 rounded-lg bg-neutral-900 text-white ${comment.length > 0 ? "hover:scale-105 cursor-pointer" : "opacity-10"} hover:bg-neutral-800 transition-all ease-in-out`} icon={faPaperPlane} />
                            </div>

                            {recipe.comments.length > 0 ?
                                recipe.comments.map((comment, index) => (
                                    <Comment key={index} recipe={recipe} updateRecipe={updateRecipe} comment={comment} />
                                ))
                                :
                                <p className='text-center text-sm'>No Comments</p>
                            }
                        </div>
                    </div>

                </div>
                :
                <LoadingPage />
            }
        </div>
    )
}

export default Recipe