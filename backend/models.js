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
    comments: [{ name: String, message: String, rating: Number }],
    totalTime: Number,
});

// Define Schema for Users
const userSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    bio: String,
    img: String, // Assuming the image is stored as a URL or file path
    showcase: [String], // Array of recipe IDs for showcase
    allRecipes: [String], // Array of recipe IDs authored by the user
    following: [String], // Array of names being followed
    followers: [String], // Array of names who follow the user
    saved: [String] // Array of recipe IDs saved by the user
});

// Create models based on the schemas
const Recipe = mongoose.model('Recipe', recipeSchema, 'Recipes');
const User = mongoose.model('User', userSchema, 'Users');

module.exports = { Recipe, User };
