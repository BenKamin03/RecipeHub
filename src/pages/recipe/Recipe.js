import React, { useState } from 'react'
import Session from '../../backend/Session'
import Ingredient from '../../components/Ingredient';
import Comment from '../../components/Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faStar as outlineStar } from '@fortawesome/free-regular-svg-icons';

const Recipe = () => {

    const queries = Session.getQueries();

    if (!queries || !queries.id) {
        Session.redirectTo("/")
    }

    const recipe = Session.getRecipeFromID(queries.id);

    const isSelf = Session.isLoggedIn() && Session.getSessionData().username === recipe.author;

    const isSaved = Session.isLoggedIn() && Session.getProfile(Session.getSessionData().username).saved.includes(queries.id);
    const [isHoveringSaved, setIsHoveringSaved] = useState(false);

    return (
        <div className='mx-24 my-12 flex flex-col justify-center items-center'>
            <div className='flex flex-row w-full'>
                <div className='w-1/2 p-4 border-r-2 '>
                    <div className='rounded-lg bg-black aspect-square'>
                        <img
                            src={recipe.img}
                            className="h-full w-full rounded-md mr-4 object-center object-cover bg-black"
                            alt={recipe.name}
                        />
                    </div>
                </div>
                <div className='w-1/2 p-4'>
                    <div className='aspect-square overflow-auto'>
                        <div className='flex flex-row justify-center'>
                            <h1 className='text-center font-semibold text-3xl mt-4 flex flex-row'>
                                {!isSelf && Session.isLoggedIn() &&
                                    <div className='text-yellow-500 mr-2 cursor-pointer' onMouseOver={(e) => setIsHoveringSaved(true)} onMouseLeave={(e) => setIsHoveringSaved(false)} onClick={(e) => Session.toggleSaved(queries.id)}>
                                        {isSaved ? !isHoveringSaved : isHoveringSaved ?
                                            <FontAwesomeIcon icon={solidStar} />
                                            :
                                            <FontAwesomeIcon icon={outlineStar} />
                                        }
                                    </div>
                                }
                                {recipe.name}
                            </h1>
                        </div>
                        <div className='flex flex-row h-min justify-center content-center my-2'>
                            <a href={`/profile?name=${recipe.author}`} className='flex flex-row justify-center content-center'>
                                <div className='bg-black aspect-square h-10 rounded-full'>
                                    <img
                                        src={Session.getProfile(recipe.author).img}
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
                                <Ingredient ingredient={ingredient} />
                            ))}
                        </div>
                        <h1 className='text-center text-xl my-2'>Instructions</h1>
                        <p>{recipe.instructions.split('\n').map((line, index) => (
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
                            Session.redirectTo(e, "/");
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
                    {recipe.comments.map((comment, index) => (
                        <Comment comment={comment} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Recipe