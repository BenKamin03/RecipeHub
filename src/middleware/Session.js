const updateSession = [];
const APIURL = 'http://localhost:5038/api/RecipeHub/'
// const bcrypt = require('bcrypt')

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
    const json = JSON.stringify(data);
    const sessionString = "session=" + json + ";";
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

function sha512(str) {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
        return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
    });
}

const logIn = async (e, userData) => {

    userData.password = await sha512(userData.password);
    const response = await fetch("http://localhost:5038/api/RecipeHub/LogIn", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (response.status == 200) {
        const json = await response.json();

        for (let i in json) {
            if (i == "img")
                userData.img = json[i];
        }

        setSessionData(userData);
        redirectTo(e, "/")
        return true;
    } else {
        alert("Incorrect Username or Password");
        return false;
    }
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

const updateProfile = async (profile) => {
    try {
        const response = await fetch("http://localhost:5038/api/RecipeHub/UpdateProfile", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return { maxPages: 0, profiles: [] }; // Return empty data or handle error as needed
    }
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

const toggleFollow = async (profile) => {

    const data = { profile: profile, user: getSessionData().name }

    const response = await fetch("http://localhost:5038/api/RecipeHub/ToggleFollow", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const d = await response.json()
    console.log(d);
    return d;
}

const toggleSaved = async (recipeID) => {

    const data = { recipe: recipeID, user: getSessionData().name }

    const response = await fetch("http://localhost:5038/api/RecipeHub/ToggleSaved", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const d = await response.json()
    console.log(d);
    return d;
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

const removeRecipe = async (recipe) => {
    console.log(recipe);
    const response = await fetch("http://localhost:5038/api/RecipeHub/RemoveRecipe", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    })

    if (response.status == 200) {
        redirectTo(null, "/");
    } else {
        alert("failed");
    }
}

const register = async (e, userData) => {

    userData.showcase = ["null", "null", "null"];
    userData.bio = "Default Description";
    userData.img = "/images/globe.png"
    userData.password = await sha512(userData.password)

    const response = await fetch("http://localhost:5038/api/RecipeHub/CreateUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })

    if (response.status == 200) {

        delete userData.showcase;
        delete userData.description;

        setSessionData(userData)
        redirectTo(e, "/")
    } else {
        alert("Error")
    }
}

const submitRecipe = async (e, recipe) => {

    recipe.author = getSessionData().name;
    // recipe.img = "/favicon.ico"

    try {
        const response = await fetch("http://localhost:5038/api/RecipeHub/CreateRecipe", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        });
        const data = await response.json();

        if (data) {
            console.log(`/recipe?id=${data.id}`);
            redirectTo(e, `/recipe?id=${data.id}`)
        }
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return { maxPages: 0, profiles: [] }; // Return empty data or handle error as needed
    }


}

const handleChangePassword = async (e, data) => {
    data.password = await sha512(data.password);
    data.newPassword = await sha512(data.newPassword)

    const response = await fetch("http://localhost:5038/api/RecipeHub/ChangePassword", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log(response.status);
    if (response.status == 200) {
        redirectTo(null, "/profile?name=" + getSessionData().name);
    } else {
        alert("Incorrect Password");
    }
}

const removeUser = async (e, password) => {
    console.log(password);

    const data = {};

    data.password = await sha512(password);
    data.name = getSessionData().name

    const response = await fetch("http://localhost:5038/api/RecipeHub/RemoveAccount", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (response.status == 200) {
        logOut(e);
    } else {
        alert("Error Deleting Account");
    }
}

const searchSaved = async (query) => {
    if (query)
        query = query.toLowerCase()

    const profile = await getProfile(getSessionData().name)

    console.log(profile)

    const recipes = [];
    for (let r of profile.saved) {
        const recipe = await getRecipeFromID(r);
        if (recipe.name.toLowerCase().includes(query)) {
            recipes.push(recipe);
        }
    }
    return recipes
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

const addComment = async (recipe, comment) => {
    console.log(comment);
    try {
        const response = await fetch("http://localhost:5038/api/RecipeHub/AddComment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({recipe: recipe, comment: comment})
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return { maxPages: 0, profiles: [] }; // Return empty data or handle error as needed
    }
}

const deleteComment = async (recipe, comment) => {
    console.log(comment);
    try {
        const response = await fetch("http://localhost:5038/api/RecipeHub/RemoveComment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({recipe: recipe, comment: comment})
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return { maxPages: 0, profiles: [] }; // Return empty data or handle error as needed
    }
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
    addComment,
    deleteComment,
    removeUser,
    setSessionData
};
