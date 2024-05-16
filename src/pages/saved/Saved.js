import React, { useState } from 'react'
import RecipeGrid from '../../components/RecipeGrid'

import SearchBar from '../../components/SearchBar';
import Session from '../../backend/Session';

const Saved = () => {

    if (!Session.isLoggedIn()) {
        Session.redirectTo(null, "/");
    }

    const queries = Session.getQueries();

    const results = Session.searchSaved(queries.search || "");

    const [recipes, setRecipes] = useState(results[0] != null ? results : [])
    
    let queryString = "";
    for (let q in queries) {
        if (q !== "search")
            queryString += `&${q}=${queries[q]}`;
    }

    const handleSearch = (query) => {
        Session.redirectTo(null, `/saved?search=${query}${queryString}`)
    }

    console.log(recipes)

    return (
        <div className='flex justify-center items-center'>
            <div className='w-2/3'>
                <SearchBar onSearch={handleSearch} />
                {recipes.length > 0 ?
                    <RecipeGrid recipes={recipes} />
                :
                <div className='text-center w-full py-48 border-2 flex justify-center content-center rounded-lg'><p className='align-middle'>No Results Found</p></div>}
            </div>
        </div>
    )
}

export default Saved