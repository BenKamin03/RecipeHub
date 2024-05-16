import React, { useEffect, useState } from 'react'
import RecipeGrid from '../../components/RecipeGrid'

import SearchBar from '../../components/SearchBar';
import Session from '../../backend/Session';
import CuisinesSearchOptions from '../../components/CuisinesSearchOptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Browse = () => {

    const recipes = Session.browseRecipes();

    const [isCuisine, setIsCuisine] = useState(false);
    const [cuisine, setCuisine] = useState(null);
    const [search, setSearch] = useState("");
    const [isHoveringCuisine, setIsHoveringCuisine] = useState(false)

    const queries = Session.getQueries();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonData = await Session.getCuisines();

                const addToData = (cuisine) => {
                    for (let ele of jsonData) {
                        if (ele.cuisine.toLowerCase() == cuisine) {
                            setCuisine(ele);
                            setIsCuisine(true);
                            break;
                        }
                    }
                }

                addToData(queries.cuisine);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const getRedirector = () => {
        let redirectorString = "";

        const newQueries = queries;

        if (newQueries.cuisine != null) {
            if (queries.cuisine != null) {
                newQueries.cuisine = cuisine;
            } else {
                delete newQueries.cuisine;
            }
        }
        if (newQueries.search != null) {
            if (queries.search != null) {
                newQueries.search = search;
            } else {
                delete newQueries.search;
            }
        }

        if (newQueries.length > 0) {
            redirectorString += `search=${search}`
            for (let q in queries) {
                if (q !== "search")
                    redirectorString += `&${q}=${queries[q]}`;
            }
        }
        return `/browse${redirectorString}`;
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='w-2/3 mt-4'>
                {isCuisine && (
                    <div className="transition ease-in-out relative rounded-3xl h-32" onMouseEnter={(e) => setIsHoveringCuisine(true)} onMouseLeave={(e) => setIsHoveringCuisine(false)}>
                        <img
                            src={cuisine.img}
                            className="h-full w-full rounded-3xl mr-4 object-center object-cover bg-black"
                            alt={cuisine.name}
                        />
                        <div className='absolute left-0 top-0 rounded-3xl h-full w-full flex justify-center items-center text-white bg-black bg-opacity-60'>
                            <div className="w-full h-full justify-center items-center flex">
                                <p className="text-4xl">{cuisine.cuisine}</p>
                            </div>
                        </div>
                        {isHoveringCuisine &&
                            <button
                                onClick={(e) => { setIsCuisine(false); setCuisine(null); Session.redirectTo(e, getRedirector()) }}
                                className="top-0 right-0 bg-red-500 text-white rounded-md py-2 px-3 scale-125 hover:bg-red-300 transition-all ease-in-out absolute">
                                <FontAwesomeIcon className="" icon={faTimes} />
                            </button>
                        }
                    </div>
                )}
                <SearchBar />
                <CuisinesSearchOptions />
                <div className='my-12'>
                    <RecipeGrid recipes={recipes} />
                </div>
            </div>
        </div>
    )
}

export default Browse