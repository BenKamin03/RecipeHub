const mongoose = require('mongoose');

// Define Schema for Recipes
const recipeSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: String,
    author: String,
    img: String, // Assuming the image is stored as a URL or file path
    description: String,
    cuisine: String,
    tags: [String],
    ingredients: [String],
    instructions: String,
    comments: [{ username: String, message: String, rating: Number }]
});

// Define Schema for Users
const userSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    bio: String,
    img: String, // Assuming the image is stored as a URL or file path
    showcase: [Number], // Array of recipe IDs for showcase
    allRecipes: [Number], // Array of recipe IDs authored by the user
    following: [String], // Array of usernames being followed
    followers: [String], // Array of usernames who follow the user
    saved: [Number] // Array of recipe IDs saved by the user
});

// Create models based on the schemas
const Recipe = mongoose.model('Recipe', recipeSchema, 'Recipes');
const User = mongoose.model('User', userSchema, 'Users');

module.exports = { Recipe, User };
