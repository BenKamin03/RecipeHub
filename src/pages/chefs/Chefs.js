import React from 'react'
import ChefCard from '../../components/ChefCard'
import Session from '../../backend/Session'
import SearchBar from '../../components/SearchBar';
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Chefs = () => {

    const queries = Session.getQueries();
    const pageNumber = parseInt(queries.page || 1);

    const profilesReturn = Session.getProfiles(queries.search || "");

    const profiles = profilesReturn.profiles;
    const maxPages = profilesReturn.maxPages;

    const isLeftDisabled = pageNumber == 1;
    const isRightDisabled = pageNumber >= maxPages;

    const convertToDoubleArray = (array, rowSize) => {
        const doubleArray = [];
        let tempArray = [];
        for (let i = 0; i < array.length; i++) {
            tempArray.push(array[i]);
            if (tempArray.length === rowSize || i === array.length - 1) {
                doubleArray.push(tempArray);
                tempArray = [];
            }
        }
        return doubleArray;
    };

    const onSearch = (e, searchQuery) => {
        if (searchQuery && searchQuery != "") {
            Session.redirectTo(e, `/chefs?search=${searchQuery}`)
        } else {
            Session.redirectTo(e, `/chefs`);
        }
    }

    const getRedirector = (search, page) => {
        let redirectorString = "";

        const newQueries = {};

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
        return `/chefs${redirectorString}`.toLowerCase();
    }

    return (
        <div className='mx-24 flex justify-center items-center flex-col mt-4'>

            <SearchBar onSearch={onSearch} placeholder={"Search Chefs"} />
            {convertToDoubleArray(profiles, 3).map((ps, index) => (
                <div className={`grid grid-cols-${ps.length} gap-4 my-2 w-${ps.length == 3 ? "full" : "2/3"}`} key={index}>
                    {ps.map((p, i) => (
                        <ChefCard profile={p} key={i} />
                    ))}
                </div>
            ))}
            <div className='flex justify-center mt-4'>
                <div className='flex flex-row gap-2'>
                    <button disabled={isLeftDisabled} onClick={(e) => {
                        Session.redirectTo(e, getRedirector(queries.search, pageNumber - 10));
                    }} className={`px-4 py-2 rounded-lg ${isLeftDisabled ? "bg-neutral-300" : "bg-black hover:bg-neutral-800 hover:scale-105"} transition-all ease-in-out text-white`}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} />
                    </button>
                    <button disabled={isLeftDisabled} onClick={(e) => {
                        Session.redirectTo(e, getRedirector(queries.search, pageNumber - 1));
                    }} className={`px-4 py-2 rounded-lg ${isLeftDisabled ? "bg-neutral-300" : "bg-black hover:bg-neutral-800 hover:scale-105"} transition-all ease-in-out text-white`}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <p className='p-2'>
                        {pageNumber}
                    </p>
                    <button disabled={isRightDisabled} onClick={(e) => {
                        Session.redirectTo(e, getRedirector(queries.search, pageNumber + 1));
                    }} className={`px-4 py-2 rounded-lg ${isRightDisabled ? "bg-neutral-300" : "bg-black hover:bg-neutral-800 hover:scale-105"} transition-all ease-in-out text-white`}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                    <button disabled={isRightDisabled} onClick={(e) => {
                        Session.redirectTo(e, getRedirector(queries.search, pageNumber + 10));
                    }} className={`px-4 py-2 rounded-lg ${isRightDisabled ? "bg-neutral-300" : "bg-black hover:bg-neutral-800 hover:scale-105"} transition-all ease-in-out text-white`}>
                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chefs