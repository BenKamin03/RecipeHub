const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// Define Schema for Recipes
const recipeSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    author: { type: String, required: true },
    img: { type: String, required: true }, // Assuming the image is stored as a URL or file path
    description: { type: String, required: true },
    cuisine: { type: String, required: true },
    tags: { type: [String], required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    comments: {
        type: [{
            name: { type: String, required: true },
            message: { type: String, required: true },
            rating: { type: Number, required: true }
        }], required: true
    },
    cookTime: { type: Number, required: true }
});


// Define Schema for Users
const userSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    bio: { type: String, required: true },
    img: { type: String, required: true }, // Assuming the image is stored as a URL or file path
    showcase: { type: [String], required: true }, // Array of recipe IDs for showcase
    allRecipes: { type: [String], required: true }, // Array of recipe IDs authored by the user
    following: { type: [String], required: true }, // Array of names being followed
    followers: { type: [String], required: true }, // Array of names who follow the user
    saved: { type: [String], required: true } // Array of recipe IDs saved by the user
});

userSchema.methods.updateBio = function (newBio) {
    this.bio = newBio;
    return this.save();
};

// Method to update image
userSchema.methods.updateImg = function (newImg) {
    this.img = newImg;
    return this.save();
};

// Method to update showcase
userSchema.methods.updateShowcase = function (newShowcase) {
    this.showcase = newShowcase;
    return this.save();
};

userSchema.methods.updatePassword = function (newPassword) {
    this.password = newPassword;
    return this.save();
};

// Create models based on the schemas
const Recipe = mongoose.model('Recipe', recipeSchema, 'Recipes');
const User = mongoose.model('User', userSchema, 'Users');

module.exports = { Recipe, User };
