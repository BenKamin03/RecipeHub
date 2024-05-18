const Express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectDB } = require('./db.js');
const multer = require('multer');
const api = require('./api.js');

const app = Express();
app.use(cors());

// Define routes
app.get('/api/RecipeHub/GetUsers', async (req, res) => {
  try {
    // Access the MongoDB database
    await api.getAllUsers(res);

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/api/RecipeHub/GetRecipes', async (req, res) => {
  try {
    // Access the MongoDB database
    await api.getAllRecipes(res);

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send("Internal Server Error");
  }
})

app.post('/api/RecipeHub/CreateUser', multer().none(), async (req, res) => {
  try {
    await api.createUser(req.post);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send("Internal Server Error");
  }
}) 


function start(PORT) {
  app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    try {
      // Connect to the MongoDB database
      database = await connectDB();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  });
}

start(5038);