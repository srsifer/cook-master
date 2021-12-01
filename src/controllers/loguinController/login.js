const loguinService = require('../../services/loguinServices/loguinService');

/** @type {import('express').RequestHandler} */
const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await loguinService.login(email, password);
  if ('status' in result) {
    return res.status(result.status).json({ message: result.message });
  }
  console.log(result);
  
  res.status(200).json(result);
};

module.exports = { login };