const connection = require('../connection');

const createRecipesInDB = async (recipes) => {
  const db = await connection();
  console.log('soia a model ai', recipes, db);
};

module.exports = { createRecipesInDB };