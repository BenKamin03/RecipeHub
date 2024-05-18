// api.js

const { Recipe, User } = require('./models');
const { connectDB } = require('./db.js');

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

// Function to get all recipes
async function getAllRecipes(res, queries) {

    connectDB()
        .then(async () => {
            // Fetch all users from the "Users" collection
            console.log(getQueries(queries));
            const recipes = await Recipe.find(getQueries(queries));

            const pageNumber = (queries.page || 1) - 1;

            console.log('Recipes:', recipes);
            res.json({maxPages: recipes.length / countPerPage, recipes: recipes.slice((pageNumber * countPerPage), (pageNumber + 1) * countPerPage)});
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
            res.json(randomRecipe._id); // Send the random recipe as JSON response
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
            console.log(queries)

            const users = await User.find(getQueries(queries));
            console.log('Users:', users);
            res.json(users);
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
            const user = await Recipe.findOne({ _id: id });
            console.log('User:', user);
            res.json(user);
        })
        .catch(error => {
            console.error('Error connecting to the database:', error);
            res.json({});
        });
}

// Function to create a new user
async function createUser(userData) {
    try {
        const newUser = await User.create(userData);
        console.log('User created successfully:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

// Function to create a new recipe
async function createRecipe(recipeData) {
    try {
        const newRecipe = await Recipe.create(recipeData);
        console.log('User created successfully:', recipeData);
        return newRecipe;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

module.exports = { getAllRecipes, getAllUsers, getUser, getRecipe, getRandomRecipe, createUser };
