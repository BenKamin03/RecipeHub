// api.js

const { Recipe, User } = require('./models');
const { connectDB } = require('./db.js');

// Function to get all recipes
async function getAllRecipes(res) {
    connectDB()
        .then(async () => {
            // Fetch all users from the "Users" collection
            const users = await Recipe.find();
            console.log('Recipes:', users);
            res.json(users);
        })
        .catch(error => {
            console.error('Error connecting to the database:', error);
            res.json([]);
        });
}

// Function to get all users
async function getAllUsers(res) {
    connectDB()
        .then(async () => {
            // Fetch all users from the "Users" collection
            const users = await User.find();
            console.log('Users:', users);
            res.json(users);
        })
        .catch(error => {
            console.error('Error connecting to the database:', error);
            res.json([]);
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
async function createUser(recipeData) {
    try {
        const newRecipe = await Recipe.create(recipeData);
        console.log('User created successfully:', recipeData);
        return newRecipe;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

module.exports = { getAllRecipes, getAllUsers, createUser };
