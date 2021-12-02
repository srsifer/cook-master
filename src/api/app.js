const express = require('express');
const createUser = require('../controllers/users/createUser');
const login = require('../controllers/loguinController/login');
const recipes = require('../controllers/recipescontroller/recipesController');

const app = express();
app.use(express.json());
app.post('/users', createUser.create);
app.post('/login', login.login);
app.post('/recipes', recipes.create);
app.get('/recipes', recipes.getRecipes);
app.get('/recipes/:id', recipes.getRecipesById);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
