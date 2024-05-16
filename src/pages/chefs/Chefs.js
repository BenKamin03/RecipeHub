import React from 'react'
import ChefCard from '../../components/ChefCard'
import Session from '../../backend/Session'
import SearchBar from '../../components/SearchBar';

const Chefs = () => {

    let profile = Session.getProfile();

    const getRating = (profile) => {
        let sum = 0;

        profile.allRecipes.map((recipe, index) => {
            sum += recipe.rating;
        })

        const average = sum / profile.allRecipes.length;

        return Math.round(average * 10) / 10
    }

    const profiles = [];

    for (let i = 0; i < 10; i++) {
        const profile = Session.getProfile(`User${Math.round(Math.random() * 100)}`);
        profile.rating = getRating(profile);
        profiles.push(profile)
    }

    profiles.sort((a, b) => {
        if (b.rating != a.rating) {
            return b.rating - a.rating;
        } else if (b.allRecipes.length != a.allRecipes.length) {
            return b.allRecipes.length - a.allRecipes.length
        } else  {
            return a.username.localeCompare(b.username);
        }
    });

    const convertToDoubleArray = (array, rowSize) => {
        const doubleArray = [];
        let tempArray = [];
        for (let i = 0; i < array.length; i++) {
            tempArray.push(array[i]);
            if (tempArray.length === rowSize || i === array.length - 1 || i + rowSize === array.length) {
                doubleArray.push(tempArray);
                tempArray = [];
            }
        }
        return doubleArray;
    };

    return (
        <div className='mx-24 flex justify-center items-center flex-col'>

            <SearchBar />
            {convertToDoubleArray(profiles, 3).map((ps, index) => (
                <div className={`grid grid-cols-${ps.length} gap-4 my-2 w-${ps.length == 3 ? "full" : "2/3"}`} key={index}>
                    {ps.map((p, i) => (
                        <ChefCard profile={p} key={i} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Chefs