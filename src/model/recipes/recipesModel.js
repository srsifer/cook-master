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

const updateById = async (recipeUpdate, id) => {
  const db = await connection();
  const recipeupdated = await db.collection('recipes').updateOne(
    { _id: id },
    { $set: { recipeUpdate } },
);
  return recipeupdated;
};

const deletRecipesById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const delleted = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return delleted;
};

module.exports = {
  createRecipesInDB,
  getAllrecipes,
  getRecipesByModel,
  updateById,
  deletRecipesById,
};