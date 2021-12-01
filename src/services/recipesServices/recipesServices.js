const jwt = require('jsonwebtoken');
const recipesModel = require('../../model/recipes/recipesModel');

const secret = 'xaolinMatadorDePorco';

const INVÁLID_ENTRIES = {
  status: 400,
  message: 'Invalid entries. Try again.', 
};

const validationEntries = (recipesEntries) => {
  const { name, ingredients, prepration } = recipesEntries;
  if (!name || !ingredients || !prepration) return true;
};

const createRecipeService = async (token, recipes) => {
  const decoded = jwt.verify(token, secret);
  console.log(decoded);
 const validEntries = validationEntries(recipes);
  if (validEntries) return INVÁLID_ENTRIES;

  const result = await recipesModel.createRecipesInDB(recipes);
  return result;
};

module.exports = {
  createRecipeService,
};