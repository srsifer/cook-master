const express = require('express');
const path = require('path');
const multer = require('multer');
const createUser = require('../controllers/users/createUser');
const login = require('../controllers/loguinController/login');
const recipes = require('../controllers/recipescontroller/recipesController');

const app = express();
app.use(express.json());  
app.use(express.static(path.resolve(__dirname, '../uploads')));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, '../uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  } });

const upload = multer({ storage });

app.post('/users', createUser.create);
app.post('/login', login.login);
app.post('/recipes', recipes.create);
app.get('/recipes', recipes.getRecipes);
app.get('/recipes/:id', recipes.getRecipesById);
app.put('/recipes/:id', recipes.updateRecipesById);
app.delete('/recipes/:id', recipes.deleteRecipesById);

app.put('/recipes/:id/image', upload.single('image'),
   recipes.uploadImage);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
