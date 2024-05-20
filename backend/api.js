// api.js

const { Recipe, User } = require('./models');
const { connectDB, generateUniqueID } = require('./db.js');

const countPerPage = 30;

const getQueries = (queries) => {
    let query = {};
    if (queries && Object.keys(queries).length > 0) {
        query = {
            $or: Object.entries(queries).map(([key, value]) => ({
                [key]: { $regex: value, $options: 'i' }
            }))
        };
    }
    console.log(query)
    return query
}

async function logIn(res, userData) {
    connectDB()
        .then(async () => {
            const user = await User.findOne(userData);
            console.log(user)
            if (user !== null) {
                res.status(200).json(user);
            } else {
                res.status(404).send("Not Found");
            }
        })
        .catch(error => {
            console.error('Error connecting to the database:', error);
            res.json([]);
        });
}

// Function to get all recipes
async function getAllRecipes(res, queries) {

    connectDB()
        .then(async () => {
            // Fetch all users from the "Users" collection
            console.log(getQueries(queries));

            const pageNumber = (parseInt(queries.page) || 1) - 1;

            delete queries.page

            const recipes = await Recipe.find(getQueries(queries));


            const totalRecipes = recipes.length;
            const maxPages = Math.ceil(totalRecipes / countPerPage);

            const start = (pageNumber) * countPerPage;
            const end = start + countPerPage;
            const paginatedRecipes = recipes.slice(start, end);

            console.log(`Max Pages: ${maxPages}`);
            console.log(`Recipes: ${recipes}`);

            res.json({
                maxPages: maxPages,
                recipes: paginatedRecipes
            });
        })
        .catch(error => {
            console.error('Error connecting to the database:', error);
            res.json([]);
        });
}

async function getRandomRecipe(res) {
    connectDB()
        .then(async () => {
            const count = await Recipe.countDocuments(); // Get the total count of recipes
            const randomIndex = Math.floor(Math.random() * count); // Generate a random index
            const randomRecipe = await Recipe.findOne().skip(randomIndex); // Get a random recipe
            res.json(randomRecipe.id); // Send the random recipe as JSON response
        })
        .catch(error => {
            console.error('Error connecting to the database:', error);
            res.json([]);
        });
}

// Function to get all users
async function getAllUsers(res, queries) {
    connectDB()
        .then(async () => {
            // Fetch all users from the "Users" collection
            // console.log(queries)

            // const users = await User.find(getQueries(queries));
            // console.log('Users:', users);
            // res.json(users);

            const pageNumber = (parseInt(queries.page) || 1) - 1;

            delete queries.page

            const users = await User.find(getQueries(queries));


            const totalUsers = users.length;
            const maxPages = Math.ceil(totalUsers / countPerPage);

            const start = (pageNumber) * countPerPage;
            const end = start + countPerPage;
            const paginatedUsers = users.slice(start, end);

            console.log(`Max Pages: ${maxPages}`);
            console.log(`Users: ${paginatedUsers}`);

            res.json({
                maxPages: maxPages,
                profiles: paginatedUsers
            });
        })
        .catch(error => {
            console.error('Error connecting to the database:', error);
            res.json([]);
        });
}

async function getUser(res, name) {
    connectDB()
        .then(async () => {
            // Fetch all users from the "Users" collection
            const user = await User.findOne({ name: name });
            console.log('User:', user);
            res.json(user);
        })
        .catch(error => {
            console.error('Error connecting to the database:', error);
            res.json([]);
        });
}

async function getRecipe(res, id) {
    connectDB()
        .then(async () => {
            // Fetch all users from the "Users" collection
            let recipe = await Recipe.findOne({ id: id });
            console.log('Recipe:', recipe);
            res.json(recipe);
        })
        .catch(error => {
            console.error('Error connecting to the database:', error);
            res.json({});
        });
}

// Function to create a new user
async function createUser(res, userData) {
    try {
        const newUser = await User.create(userData);
        console.log('User created successfully:', newUser);
        res.send("Success");
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(404).send("Error");
    }
}

// Function to create a new recipe
async function createRecipe(res, recipeData) {
    try {
        recipeData.id = generateUniqueID();

        const newRecipe = await Recipe.create(recipeData);
        console.log('User created successfully:', newRecipe);



        console.log(await User.updateOne({ name: recipeData.author }, {
            $addToSet: {
                allRecipes: recipeData.id
            }
        }))

        res.status(200).send(newRecipe);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send("Internal Server Error");
    }
}

const removeRecipe = async (res, recipeData) => {
    try {
        let id = recipeData.id;

        console.log(id);
        const deletedRecipe = await Recipe.findOneAndDelete({ id: id });
        console.log(deletedRecipe)
        if (deletedRecipe) {
            console.log("deleted")
            await User.updateMany(
                {},
                {
                    $pull: {
                        showcase: id,
                        allRecipes: id,
                        saved: id
                    }
                }
            );

            res.status(200).send("true")
        } else {
            res.status(400).send("false");
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(404).send("Error");
    }
}

//{profile: profile, user: getSessionData().name}
async function toggleFollow(res, data) {
    try {
        const user = await User.findOne({ name: data.user });

        if (user) {
            if (user.following.indexOf(data.profile) != -1) { //Doesn't contain 

                await User.updateOne({ name: data.user }, {
                    $pull: {
                        following: data.profile
                    }
                })

                await User.updateOne({ name: data.profile }, {
                    $pull: {
                        followers: data.user
                    }
                })

                res.status(200).send("false");
            } else { //Contains

                await User.updateOne({ name: data.user }, {
                    $addToSet: {
                        following: data.profile
                    }
                })

                await User.updateOne({ name: data.profile }, {
                    $addToSet: {
                        followers: data.user
                    }
                })

                res.status(200).send("true");
            }
        } else {
            res.status(404).send("Could not find user")
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send("Internal Server Error");
    }
}

// {user: username, recipe: recipeID}
async function toggleSaved(res, data) {

    console.log(data.user)
    try {
        const recipe = await Recipe.findOne({ id: data.recipe });
        const user = await User.findOne({ name: data.user });

        console.log(recipe);
        console.log(user)

        if (recipe && user) {
            if (user.saved.indexOf(data.recipe) != -1) { //Doesn't contain 

                await User.updateOne({ name: data.user }, {
                    $pull: {
                        saved: data.recipe
                    }
                })

                res.status(200).send("false");
            } else { //Contains

                await User.updateOne({ name: data.user }, {
                    $addToSet: {
                        saved: data.recipe
                    }
                })

                res.status(200).send("true");
            }
        } else {
            res.status(404).send("Could not find user")
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send("Internal Server Error");
    }
}

async function updateProfile(res, data) {
    try {
        const user = await User.findOne({ name: data.name });

        if (user) {
            await user.updateBio(data.bio);
            await user.updateImg(data.img);
            await user.updateShowcase(data.showcase);

            res.status(200).send("true");
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send("Internal Server Error");
    }
}

async function addComment(res, data) {
    try {
        const recipe = await Recipe.findOne({ id: data.recipe.id });

        if (recipe) {
            await Recipe.updateOne({ id: data.recipe.id }, {
                $addToSet: {
                    comments: data.comment
                }
            })
            console.log(recipe);
            res.status(200).send("true");
        } else {
            res.status(404).send("false");
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send("Internal Server Error");
    }
}

async function removeComment(res, data) {
    try {
        const recipe = await Recipe.findOne({ id: data.recipe.id });

        if (recipe) {
            await Recipe.updateOne({ id: data.recipe.id }, {
                $pull: {
                    comments: data.comment
                }
            })
            console.log(recipe);
            res.status(200).send("true");
        } else {
            res.status(404).send("false");
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send("Internal Server Error");
    }
}

async function changePassword(res, data) {
    try {
        const user = await User.findOne({ name: data.name, password: data.password });
        if (user) {
            await User.updateOne({ name: data.name, password: data.password }, { password: data.newPassword })
            res.status(200).send("true");
        } else {
            res.status(404).send("false");
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send("Internal Server Error");
    }
}

async function removeAccount(res, data) {
    try {
        const recipes = (await User.findOne({ name: data.name, password: data.password })).allRecipes;
        const user = await User.deleteOne({ name: data.name, password: data.password });
        console.log(user);
        if (user) {
            await User.updateMany({ following: data.name }, { $pull: { following: data.name } });
            await User.updateMany({ followers: data.name }, { $pull: { followers: data.name } });
            await User.updateMany({ followers: data.name }, { $pull: { followers: data.name } });
            await Recipe.deleteMany({ author: data.name });
            await Recipe.updateMany(
                { 'comments.name': data.name },
                { $pull: { comments: { name: data.name } } }
            );

            for (let recipe of recipes) {
                await User.updateMany({ saved: recipe.id }, { $pull: { saved: recipe.id } });
            }

            res.status(200).send("true");
        } else {
            res.status(404).send("false");
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { getAllRecipes, getAllUsers, getUser, getRecipe, getRandomRecipe, createUser, createRecipe, removeRecipe, logIn, toggleFollow, toggleSaved, updateProfile, addComment, removeComment, changePassword, removeAccount };
