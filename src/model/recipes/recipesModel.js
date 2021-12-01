const connection = require('../connection');

const createRecipesInDB = async (recipes) => {
  const db = await connection();
  const inserted = await db.collection('recipes').insertOne(recipes);
  console.log(inserted.ops[0]);
  return inserted.ops[0];
};

const getAllrecipes = async () => {
 const db = await connection();
 const allRecipes = await db.collection('recipes').find({}).toArray();
 return allRecipes;
};
module.exports = { createRecipesInDB, getAllrecipes };