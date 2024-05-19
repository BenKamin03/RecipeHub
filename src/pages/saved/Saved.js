import React, { useEffect, useState } from 'react'
import RecipeGrid from '../../components/RecipeGrid'

import SearchBar from '../../components/SearchBar';
import Session from '../../middleware/Session';
import LoadingPage from '../../components/Loading';

const Saved = () => {

    if (!Session.isLoggedIn()) {
        Session.redirectTo(null, "/");
    }

    const queries = Session.getQueries();

    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const results = await Session.searchSaved(queries.search || "")

            setRecipes(results);

            setIsLoading(false);
        }

        fetchData();
    }, [])

    let queryString = "";
    for (let q in queries) {
        if (q !== "search")
            queryString += `&${q}=${queries[q]}`;
    }

    const handleSearch = (e, query) => {
        Session.redirectTo(e, `/saved?search=${query}${queryString}`)
    }

    return (
        <div className='flex justify-center items-center mt-4'>
            <div className='w-2/3'>
                <SearchBar onSearch={handleSearch} placeholder={"Search Saved"} />
                {isLoading ? <LoadingPage /> :
                    <div>
                        {
                            recipes.length > 0 ?
                                <RecipeGrid recipes={recipes} />
                                :
                                <div className='text-center w-full py-48 border-2 flex justify-center content-center rounded-lg'><p className='align-middle'>No Results Found</p></div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Saved