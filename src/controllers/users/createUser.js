const createUserServices = require('../../services/createUserServices');
/** @type {import('express').RequestHandler} */

const create = async (req, res) => {
  const { name, email, password } = req.body;
   const result = await createUserServices.createUserRules(name, email, password);
  
  if ('status' in result) {
    console.log(result.status, result.message);
    return res.status(result.status).json({ message: result.message }); 
  }
   res.status(201).json(result);
};

module.exports = { create };