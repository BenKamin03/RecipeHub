import React, { useEffect, useState } from 'react'
import RecipeGrid from '../../components/RecipeGrid'

import SearchBar from '../../components/SearchBar';
import Session from '../../middleware/Session';
import CuisinesSearchOptions from '../../components/CuisinesSearchOptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faCaretLeft, faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons';

const Browse = () => {

    const [isCuisine, setIsCuisine] = useState(false);
    const [isHoveringCuisine, setIsHoveringCuisine] = useState(false)

    // recipes = Session.browseRecipes();

    const queries = Session.getQueries();
    const pageNumber = parseInt(queries.page || 1);

    const browse = Session.browseRecipes(queries);

    const recipes = browse.recipes;
    const maxPages = browse.maxPages;

    const isLeftDisabled = pageNumber == 1;
    const isRightDisabled = pageNumber >= maxPages;

    const [cuisine, setCuisine] = useState(queries.cuisine ? queries.cuisine.cuisine : "");
    const [search, setSearch] = useState(queries.search || "");


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

    const getRedirector = (cuisine, search, page) => {
        let redirectorString = "";

        const newQueries = {};

        if (cuisine) {
            newQueries.cuisine = cuisine;
        }

        if (search && search != "") {
            newQueries.search = search;
        }

        if (page && (page = Math.min(Math.max(page, 1), maxPages)) != 1) {
            newQueries.page = page;
        }

        for (let ele in newQueries) {
            if (ele !== null) {
                if (redirectorString.charAt(0) == "?") {
                    redirectorString += "&"
                } else {
                    redirectorString += "?"
                }
                redirectorString += `${ele}=${newQueries[ele]}`;
            }
        }
        return `/browse${redirectorString}`.toLowerCase();
    }

    const onSearch = (e, searchQuery) => {
        Session.redirectTo(e, getRedirector(cuisine.cuisine, searchQuery, 1));
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
                                onClick={(e) => { setIsCuisine(false); setCuisine(null); Session.redirectTo(e, getRedirector(null, search, null)) }}
                                className="top-0 right-0 bg-red-500 text-white rounded-md py-2 px-3 scale-125 hover:bg-red-300 transition-all ease-in-out absolute">
                                <FontAwesomeIcon className="" icon={faTimes} />
                            </button>
                        }
                    </div>
                )}
                <SearchBar onSearch={onSearch} placeholder={"Search Recipes"} />
                <CuisinesSearchOptions setCuisine={setCuisine} />
                <div className='my-12'>
                    <RecipeGrid recipes={recipes} />
                    <div className='flex justify-center'>
                        <div className='flex flex-row gap-2'>
                            <button disabled={isLeftDisabled} onClick={(e) => {
                                Session.redirectTo(e, getRedirector(cuisine.cuisine, search, pageNumber - 10));
                            }} className={`px-4 py-2 rounded-lg ${isLeftDisabled ? "bg-neutral-300" : "bg-black hover:bg-neutral-800 hover:scale-105"} transition-all ease-in-out text-white`}>
                                <FontAwesomeIcon icon={faAngleDoubleLeft} />
                            </button>
                            <button disabled={isLeftDisabled} onClick={(e) => {
                                Session.redirectTo(e, getRedirector(cuisine.cuisine, search, pageNumber - 1));
                            }} className={`px-4 py-2 rounded-lg ${isLeftDisabled ? "bg-neutral-300" : "bg-black hover:bg-neutral-800 hover:scale-105"} transition-all ease-in-out text-white`}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </button>
                            <p className='p-2'>
                                {pageNumber}
                            </p>
                            <button disabled={isRightDisabled} onClick={(e) => {
                                Session.redirectTo(e, getRedirector(cuisine.cuisine, search, pageNumber + 1));
                            }} className={`px-4 py-2 rounded-lg ${isRightDisabled ? "bg-neutral-300" : "bg-black hover:bg-neutral-800 hover:scale-105"} transition-all ease-in-out text-white`}>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                            <button disabled={isRightDisabled} onClick={(e) => {
                                Session.redirectTo(e, getRedirector(cuisine.cuisine, search, pageNumber + 10));
                            }} className={`px-4 py-2 rounded-lg ${isRightDisabled ? "bg-neutral-300" : "bg-black hover:bg-neutral-800 hover:scale-105"} transition-all ease-in-out text-white`}>
                                <FontAwesomeIcon icon={faAngleDoubleRight} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Browse