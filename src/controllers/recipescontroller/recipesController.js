const recipesServices = require('../../services/recipesServices/recipesServices');

const create = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }
  const { body } = req;
  const result = await recipesServices.createRecipeService(token, body);
  if ('status' in result) {
    return res.status(result.status).json({ message: result.message });
  }
  res.status(201).json(result);
};

module.exports = { create };