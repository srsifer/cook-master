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

const validationEntries = (recipesEntries) => {
  const { name, ingredients, preparation } = recipesEntries;
  if (!name || !ingredients || !preparation) return true;
  return false;
};

const createObjectRecipe = (decoded, recipe) => {
 const { name, ingredients, preparation } = recipe;
 const { _id } = decoded; 
 const objectRecipe = {
   recipe: {
     name,
     ingredients,
     preparation,
     userId: _id,
   },
 };
 return objectRecipe;
};

const resultFilter = (result) => {
  const { recipe, _id } = result;
  const { name, ingredients, preparation, userId } = recipe;
  const resultFiltred = {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
     _id,
    },
  };
   return resultFiltred;
};

const createRecipeService = async (token, recipes) => {
  try {
    const decoded = jwt.verify(token, secret);
    const validEntries = validationEntries(recipes);
    if (validEntries) return INVÁLID_ENTRIES;
    const objectRecipe = createObjectRecipe(decoded, recipes);

    const result = await recipesModel.createRecipesInDB(objectRecipe);
    const resultFiltred = await resultFilter(result);
    console.log(resultFiltred);
    return resultFiltred;
  } catch (error) {
    return INVÁLID_TOKEN;
  }
};

module.exports = {
  createRecipeService,
};