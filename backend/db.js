const mongoose = require('mongoose');
const { connectionString, db } = require('./credentials');

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect(connectionString, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            dbName: db // Specify the database name here
        });
        console.log('Database connected successfully');
        // Access the MongoDB database
        const database = mongoose.connection.db;
        return database;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
};

const generateUniqueID = () => {
    return new mongoose.Types.ObjectId().toString();
}

module.exports = { connectDB, generateUniqueID };
