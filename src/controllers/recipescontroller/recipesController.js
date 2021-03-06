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

const getRecipes = async (_req, res) => {
  const result = await recipesServices.getAllrecipesService();
  return res.status(200).json(result);
};

const getRecipesById = async (req, res) => {
  const { id } = req.params;
  const result = await recipesServices.getRecipesByServices(id);
  if ('status' in result) {
    return res.status(result.status).json({ message: result.message });
  }
  res.status(200).json(result);
};

const updateRecipesById = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  const { body } = req;
  const result = await recipesServices.updateRecipesByIdService(id, token, body);
  if ('status' in result) {
    return res.status(result.status).json({ message: result.message });
  }
  res.status(200).json(result);
};

 const deleteRecipesById = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  const { body } = req;
  const result = await recipesServices.deletRecipesByIdService(id, token, body);
  if ('status' in result) {
    return res.status(result.status).json({ message: result.message });
  }
  res.status(204).json();
 };

 const uploadImage = async (req, res) => {
   const { id } = req.params;
   const token = req.headers.authorization;
   if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
   const result = await recipesServices.updateImaageService(id, token);
  
   res.status(200).json(result);
 };

module.exports = {
  create,
  getRecipes,
  getRecipesById,
  updateRecipesById,
  deleteRecipesById,
  uploadImage,
};