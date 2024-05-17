const updateSession = [];

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

const getRecipeFromID = (id) => {
    // Mock implementation, replace with actual logic
    return {
        id: id,
        name: "Tri-Tip Steak",
        author: `bakamin`,
        img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
        description: "Deserunt commodo mollit et in. Aliqua consequat nisi est reprehenderit. Excepteur deserunt tempor non aute dolore excepteur commodo mollit culpa anim cillum qui. Occaecat eu nulla minim reprehenderit veniam eiusmod laborum et dolore. Quis esse esse proident id minim id laboris adipisicing reprehenderit. Deserunt nisi minim proident excepteur laborum quis aute velit proident esse excepteur. Eiusmod ad qui nulla irure veniam occaecat officia irure enim cillum.",
        cuisine: "American",
        tags: ["Steak", "Tri-Tip Steak", "Garlic", "Peppers", "American"],
        ingredients: ["Apple", "Cherry", "Garlic", "Steak"],
        instructions: "Voluptate esse aliquip ut ex elit labore excepteur quis. Tempor enim sunt proident commodo et proident qui reprehenderit id laborum sit excepteur. Fugiat ad esse officia occaecat consectetur non do mollit officia in irure proident consectetur. Commodo irure sit laborum proident eiusmod ad.\n\nEa nisi elit labore duis ullamco aute. Ipsum magna non nostrud mollit exercitation nisi aute quis aliqua non sint nostrud culpa ut. Lorem nostrud pariatur Lorem occaecat incididunt in eu et. Cupidatat ad do nisi consequat aliquip duis esse aliquip consequat do ullamco. Consequat ad labore aute ea amet deserunt proident incididunt eiusmod aliquip tempor ex.\n\nPariatur laboris nostrud deserunt et aute aliquip. Minim enim reprehenderit voluptate ea sint labore. Veniam reprehenderit excepteur do enim commodo ullamco ipsum duis proident mollit irure ullamco. Aute enim commodo nisi magna dolor id.",
        comments: [
            { username: "bakamin", message: "Lorem Ipsum is simply dummy text", rating: 4 },
            { username: "bakamin", message: "Lorem Ipsum is simply dummy text", rating: 4 },
            { username: "bakamin", message: "Lorem Ipsum is simply dummy text", rating: 4 },
            { username: "bakamin", message: "Lorem Ipsum is simply dummy text", rating: 4 },
        ],
        visits: 144,
    };
}

const getRandomRecipeID = () => {
    const maxSize = 100;
    return Math.floor(Math.random() * maxSize);
}

const updateProfile = (profile) => {

}

const getProfile = (username) => {
    // Mock implementation, replace with actual logic
    return {
        username: username,
        bio: "Eiusmod exercitation aliqua nisi eu proident occaecat labore aliqua et. Voluptate deserunt occaecat eiusmod qui consectetur cillum sint Lorem minim ullamco. Nostrud reprehenderit dolor anim laborum es",
        img: "/images/globe.png",
        showcase: [
            1, 2, 3
        ],
        allRecipes: [
            1, 2, 3, 4, 5, 6, 7
        ],
        following: [
            "User46",
            "bakamin"
        ], //usernames
        followers: [
            "bakamin",
            "bakamin",
            "bakamin",
            "bakamin",
            "bakamin",
            "bakamin",
            "bakamin",
            "bakamin",
            "bakamin",
            "bakamin",
            "bakamin",
            "bakamin",
            "bakamin",
            "bakamin",
            "bakamin",
            "bakamin",
        ], //usernames
        saved: [
            12,
        ], //ids
    };
}

const toggleFollow = (user, functions) => {

    functions.map((func, index) => {
        func();
    })
}

const browseRecipes = (queries) => {
    return {
        recipes: [
            {
                name: "Tri-Tip Steak",
                href: "",
                img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
                description:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
                cuisine: "American",
                tags: ["Steak", "Tri-Tip Steak", "Garlic"],
            },
            {
                name: "Tri-Tip Steak",
                href: "",
                img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
                description:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
                cuisine: "American",
                tags: ["Steak", "Tri-Tip Steak", "Garlic"],
            },
            {
                name: "Tri-Tip Steak",
                href: "",
                img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
                description:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
                cuisine: "American",
                tags: ["Steak", "Tri-Tip Steak", "Garlic"],
            },
            {
                name: "Tri-Tip Steak",
                href: "",
                img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
                description:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
                cuisine: "American",
                tags: ["Steak", "Tri-Tip Steak", "Garlic"],
            },
            {
                name: "Tri-Tip Steak",
                href: "",
                img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
                description:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
                cuisine: "American",
                tags: ["Steak", "Tri-Tip Steak", "Garlic"],
            },
            {
                name: "Tri-Tip Steak",
                href: "",
                img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
                description:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
                cuisine: "American",
                tags: ["Steak", "Tri-Tip Steak", "Garlic"],
            },
            {
                name: "Tri-Tip Steak",
                href: "",
                img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
                description:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
                cuisine: "American",
                tags: ["Steak", "Tri-Tip Steak", "Garlic"],
            },
            {
                name: "Tri-Tip Steak",
                href: "",
                img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
                description:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
                cuisine: "American",
                tags: ["Steak", "Tri-Tip Steak", "Garlic"],
            },
            {
                name: "Tri-Tip Steak",
                href: "",
                img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
                description:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
                cuisine: "American",
                tags: ["Steak", "Tri-Tip Steak", "Garlic"],
            },
            {
                name: "Tri-Tip Steak",
                href: "",
                img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
                description:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
                cuisine: "American",
                tags: ["Steak", "Tri-Tip Steak", "Garlic"],
            },
            {
                name: "Tri-Tip Steak",
                href: "",
                img: "https://biteswithbri.com/wp-content/uploads/2021/02/HamburgerPattyRecipe04.jpg",
                description:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
                cuisine: "American",
                tags: ["Steak", "Tri-Tip Steak", "Garlic"],
            },
        ], maxPages: 10
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

    const profile = getProfile(getSessionData().username)

    return profile.saved.map((recipeID, index) => {
        const recipe = getRecipeFromID(recipeID);
        console.log(recipe.name + " " + query);
        if (recipe.name.toLowerCase().includes(query)) {
            return recipe;
        }
    })

    // recipe => {return showcase != null && !showcase.some(showcasedRecipe => showcasedRecipe != null && showcasedRecipe.id === recipe.id)
}

const getProfiles = (search, page) => {
    const length = 24;
    return {
        profiles: Array.from({ length }, () =>
            Math.floor(Math.random() * (100 - 1 + 1)) + 1
        ).map((id, index) => getProfile(`User${id}`)).filter((profile) =>
            `${profile.username}`.toLowerCase().includes(search)
        ).sort((a, b) => {
            if (a.allRecipes.length === b.allRecipes.length) {
                return a.username.localeCompare(b.username);
            }
            return b.allRecipes.length - a.allRecipes.length;
        }), maxPages: 10
    };
}

const toggleSaved = (recipeID) => {
    alert(recipeID)
}

export default {
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
