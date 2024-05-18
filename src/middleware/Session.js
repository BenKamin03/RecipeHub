const updateSession = [];
const APIURL = 'http://localhost:5038/api/RecipeHub/'

const addSessionListener = (func) => {
    updateSession.push(func);
}

const getSessionData = () => {
    const sessionCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('session='));
    if (sessionCookie) {
        return JSON.parse(sessionCookie.split('=')[1]);
    } else {
        return null;
    }
}

const clearSessionData = () => {
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

const setSessionData = (data) => {
    const sessionString = `session=${JSON.stringify(data)};`;
    document.cookie = sessionString;
}

const isLoggedIn = () => {
    const session = getSessionData();
    return !!session;
}

const redirectTo = (e, href) => {
    try {
        e.stopPropagation();
    } finally {
        window.location.href = href;
    }
}

const logOut = (e) => {
    clearSessionData();
    redirectTo(e, "/")
}

const logIn = (e, userData) => {
    setSessionData(userData);
    redirectTo(e, "/")
}

const getCuisines = async () => {
    const response = await fetch("/data/cuisines.json");
    const jsonData = await response.json();
    return jsonData;
}

const getQueries = () => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const queryParams = {};

    for (const [key, value] of params.entries()) {
        queryParams[key] = value;
    }

    return queryParams;
}

const getRecipeFromID = async (id) => {
    try {
        const response = await fetch("http://localhost:5038/api/RecipeHub/GetRecipe?id=" + id);
        console.log("http://localhost:5038/api/RecipeHub/GetRecipe?id=" + id);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Recipe:', error);
        return null; // Return empty data or handle error as needed
    }
}

const getRandomRecipeID = async () => {
    try {
        const response = await fetch("http://localhost:5038/api/RecipeHub/RandomRecipe");
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching Recipe:', error);
        return null; // Return empty data or handle error as needed
    }
}

const updateProfile = (profile) => {

}

const getProfile = async (name) => {
    // Mock implementation, replace with actual logic
    try {
        const response = await fetch("http://localhost:5038/api/RecipeHub/GetUser?name=" + name);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return { maxPages: 0, profiles: [] }; // Return empty data or handle error as needed
    }
}

const toggleFollow = (user, functions) => {

    functions.map((func, index) => {
        func();
    })
}

const browseRecipes = async (queries) => {
    try {
        const response = await fetch("http://localhost:5038/api/RecipeHub/GetRecipes" + window.location.search);
        console.log("http://localhost:5038/api/RecipeHub/GetRecipes" + window.location.search);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return { maxPages: 0, profiles: [] }; // Return empty data or handle error as needed
    }
}

const removeRecipe = (recipe) => {

}

const register = (e, userData) => {
    logIn(e, userData)
    redirectTo(e, "/")
}

const submitRecipe = (e, recipe) => {
    redirectTo(e, `/recipe?id=${"id"}`)
}

const handleChangePassword = (e, data) => {
    return true;
}

const searchSaved = (query) => {
    query = query.toLowerCase()

    const profile = getProfile(getSessionData().name)

    return profile.saved.map((recipeID, index) => {
        const recipe = getRecipeFromID(recipeID);
        console.log(recipe.name + " " + query);
        if (recipe.name.toLowerCase().includes(query)) {
            return recipe;
        }
    })
}

const getProfiles = async (search, page) => {
    try {
        const response = await fetch("http://localhost:5038/api/RecipeHub/GetUsers" + window.location.search);
        const data = await response.json();
        return { maxPages: data.length, profiles: data };
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return { maxPages: 0, profiles: [] }; // Return empty data or handle error as needed
    }
}


const toggleSaved = (recipeID) => {
    alert(recipeID)
}

module.exports = {
    isLoggedIn: isLoggedIn,
    redirectTo: redirectTo,
    logOut: logOut,
    logIn: logIn,
    getProfile: getProfile,
    getQueries: getQueries,
    getRecipeFromID: getRecipeFromID,
    getRandomRecipeID: getRandomRecipeID,
    getCuisines: getCuisines,
    addSessionListener: addSessionListener,
    getSessionData: getSessionData,
    toggleFollow: toggleFollow,
    browseRecipes: browseRecipes,
    register: register,
    submitRecipe: submitRecipe,
    updateProfile: updateProfile,
    removeRecipe: removeRecipe,
    handleChangePassword: handleChangePassword,
    searchSaved: searchSaved,
    getProfiles: getProfiles,
    toggleSaved: toggleSaved,
};
