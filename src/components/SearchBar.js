import React, { useState } from 'react';

import { faRefresh, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Session from '../middleware/Session';

const SearchBar = ({ placeholder, filterOptions, onSearch, searchQuery }) => {
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        if (onSearch !== null)
            onSearch(searchTerm);
    };

    const queries = Session.getQueries();

    const [search, setSearch] = useState(queries[searchQuery || "search"] || "");


    return (
        <div className='flex w-full flex-row justify-center items-center my-4'>
            <input
                type="text"
                className="border p-2 w-full text-center rounded-lg mr-2"
                value={search}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSearch(e, search);
                    }
                }}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={placeholder}
            />
            <button onClick={(e) => onSearch(e, search)} className='py-2 px-3 bg-black text-white rounded-lg'><FontAwesomeIcon icon={faSearch} /></button>
        </div>
    );
};

export default SearchBar;
