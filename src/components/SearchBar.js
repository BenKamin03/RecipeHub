import React from 'react';

import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Session from '../backend/Session';

const SearchBar = ({ placeholder, filterOptions, onSearch }) => {
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        if (onSearch !== null)
            onSearch(searchTerm);
    };

    const queries = Session.getQueries();


    return (
        <div className='flex w-full flex-row justify-center items-center my-4'>
            <input type='text' className='border p-2 w-full text-center rounded-lg mr-2' value={queries.search}  onKeyDown={(e) => { if (e.key == "Enter") handleSearch(e) }} onChange={(e) => { }} placeholder={placeholder} />
            <button className='py-2 px-3 bg-black text-white rounded-lg'><FontAwesomeIcon icon={faRefresh} /></button>
        </div>
    );
};

export default SearchBar;
