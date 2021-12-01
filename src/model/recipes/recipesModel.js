const connection = require('../connection');

const createRecipesInDB = async (recipes) => {
  const db = await connection();
  const inserted = await db.collection('recipes').insertOne(recipes);
  console.log(inserted.ops[0]);
  return inserted.ops[0];
};

module.exports = { createRecipesInDB };