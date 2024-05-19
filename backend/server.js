const Express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectDB } = require('./db.js');
const multer = require('multer');
const api = require('./api.js');

const app = Express();
app.use(cors());
app.use(Express.json())

// Define routes
app.get('/api/RecipeHub/GetUsers', async (req, res) => {
  try {
    // Access the MongoDB database
    await api.getAllUsers(res, req.query);

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/api/RecipeHub/GetUser', async (req, res) => {
  try {
    // Access the MongoDB database
    console.log(req.query.name);
    await api.getUser(res, req.query.name || "");

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send("Internal Server Error");
  }
})

app.get('/api/RecipeHub/GetRecipes', async (req, res) => {
  try {
    // Access the MongoDB database
    await api.getAllRecipes(res, req.query);

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send("Internal Server Error");
  }
})

app.get('/api/RecipeHub/GetRecipe', async (req, res) => {
  try {
    // Access the MongoDB database
    await api.getRecipe(res, req.query.id);

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send("Internal Server Error");
  }
})

app.get('/api/RecipeHub/RandomRecipe', async (req, res) => {
  try {
    await api.getRandomRecipe(res)
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    res.status(500).json({ error: 'Failed to fetch random recipe' });
  }
});

app.post('/api/RecipeHub/CreateUser', async (req, res) => {
  try {
    await api.createUser(res, req.body);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send("Internal Server Error");
  }
})

app.post('/api/RecipeHub/CreateRecipe', async (req, res) => {
  try {
    await api.createRecipe(res, req.body);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send("Internal Server Error");
  }
})

app.post('/api/RecipeHub/RemoveRecipe', async (req, res) => {
  try {
    await api.removeRecipe(res, req.body);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send("Internal Server Error");
  }
})

app.post('/api/RecipeHub/LogIn', async (req, res) => {
  try {
    console.log(req.body)
    await api.logIn(res, req.body)
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send("Internal Server Error");
  }
})

app.post('/api/RecipeHub/ToggleFollow', async (req, res) => {
  try {
    await api.toggleFollow(res, req.body)
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send("Internal Server Error");
  }
})

app.post('/api/RecipeHub/ToggleSaved', async (req, res) => {
  try {
    await api.toggleSaved(res, req.body)
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send("Internal Server Error");
  }
})

app.post('/api/RecipeHub/UpdateProfile', async (req, res) => {
  try {
    await api.updateProfile(res, req.body)
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send("Internal Server Error");
  }
})

app.post('/api/RecipeHub/AddComment', async (req, res) => {
  try {
    await api.addComment(res, req.body)
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send("Internal Server Error");
  }
})

app.post('/api/RecipeHub/RemoveComment', async (req, res) => {
  try {
    await api.removeComment(res, req.body)
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send("Internal Server Error");
  }
})

app.post('/api/RecipeHub/ChangePassword', async (req, res) => {
  try {
    await api.changePassword(res, req.body)
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send("Internal Server Error");
  }
})

app.post('/api/RecipeHub/RemoveAccount', async (req, res) => {
  try {
    await api.removeAccount(res, req.body)
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