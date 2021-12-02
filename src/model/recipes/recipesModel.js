const { ObjectId } = require('mongodb');
const connection = require('../connection');

const createRecipesInDB = async (recipes) => {
  const db = await connection();
  const inserted = await db.collection('recipes').insertOne(recipes);
  return inserted.ops[0];
};

const getAllrecipes = async () => {
 const db = await connection();
 const allRecipes = await db.collection('recipes').find({}).toArray();
 return allRecipes;
};

const getRecipesByModel = async (id) => {
  const db = await connection();
  const recipes = await db.collection('recipes').findOne(ObjectId(id));
  
  return recipes;
};
module.exports = { createRecipesInDB, getAllrecipes, getRecipesByModel };