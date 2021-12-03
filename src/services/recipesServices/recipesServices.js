const jwt = require('jsonwebtoken');
const recipesModel = require('../../model/recipes/recipesModel');

const secret = 'xaolinMatadorDePorco';

const INVÁLID_ENTRIES = {
  status: 400,
  message: 'Invalid entries. Try again.', 
};

const INVÁLID_TOKEN = {
  status: 401,
  message: 'jwt malformed',

};

const NOT_FOUND = {
  status: 404,
  message: 'recipe not found',
};

const validationEntries = (recipesEntries) => {
  const { name, ingredients, preparation } = recipesEntries;
  if (!name || !ingredients || !preparation) return true;
  return false;
};

const createObjectRecipe = (decoded, recipe) => {
 const { name, ingredients, preparation } = recipe;
 const { _id } = decoded; 
 const objectRecipe = {
     name,
     ingredients,
     preparation,
     userId: _id,
 };
 return objectRecipe;
};

const createRecipeService = async (token, recipes) => {
  try {
    const decoded = jwt.verify(token, secret);
    const validEntries = validationEntries(recipes);
    if (validEntries) return INVÁLID_ENTRIES;
    const objectRecipe = createObjectRecipe(decoded, recipes);

    const result = await recipesModel.createRecipesInDB(objectRecipe);

    return { recipe: result };
  } catch (error) {
    return INVÁLID_TOKEN;
  }
};

const getAllrecipesService = async () => {
  const result = await recipesModel.getAllrecipes();
  return result;
};

const getRecipesByServices = async (id) => {
  if (id.length < 24) return NOT_FOUND;
 const recipes = await recipesModel.getRecipesByModel(id);
 if (!recipes) return NOT_FOUND;
 return recipes;
};

const updateRecipesByIdService = async (_id, token, body) => {
  try {
    const decoded = jwt.verify(token, secret);
    if (_id.length < 24) return NOT_FOUND;
    const validEntries = validationEntries(body);
    if (validEntries) return INVÁLID_ENTRIES;
    const objectRecipe = createObjectRecipe(decoded, body);
    const result = await recipesModel.updateById(objectRecipe, _id);
     if (!result) return null;
    return { _id, ...objectRecipe };
  } catch (error) {
    return INVÁLID_TOKEN;
  }
};

const deletRecipesByIdService = async (_id, token) => {
  try {
    jwt.verify(token, secret);
    const result = await recipesModel.deletRecipesById(_id);
   
    return result;
  } catch (error) {
    return INVÁLID_TOKEN;
  }
};

module.exports = {
  createRecipeService,
  getAllrecipesService,
  getRecipesByServices,
  updateRecipesByIdService,
  deletRecipesByIdService,
};