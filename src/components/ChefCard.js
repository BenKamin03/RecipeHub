import React from 'react'

import TopCuisines from './TopCuisines'
import Session from '../middleware/Session'

const ChefCard = ({ profile }) => {
    let rating = 0;
    const length = profile.allRecipes.length
    const allRecipes = profile.allRecipes.map((recipe) => { 
        let curr = Session.getRecipeFromID(recipe);
        for (let comment of curr.comments) {
            rating += comment.rating / curr.comments.length;
        }
        return curr;
     })

     rating = Math.round(rating / length * 100) / 100

    return (
        <div onClick={(e) => Session.redirectTo(e, `/profile?name=${profile.username}`)} className='cursor-pointer bg-gray-200 rounded-lg p-4 flex flex-row gap-4 transition-all ease-in-out hover:scale-110 hover:bg-gray-300'>
            <div className=''>
                <div className={"bg-black rounded-full aspect-square w-48"}>
                    <img
                        src={profile.img}
                        className="h-full w-full rounded-full mr-4 object-center object-cover bg-black"
                        alt="Profile"
                    />
                </div>
                <h1 className='w-full text-center pt-2'>{profile.username}</h1>
            </div>
            <div className="flex w-full justify-center items-center gap-2 flex-col">
                <TopCuisines max={3} allRecipes={allRecipes} />
                <p className='w-36 text-center'>{rating} / 5</p>
            </div>
        </div>
    )
}

export default ChefCard