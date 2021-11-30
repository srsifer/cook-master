const createUserServices = require('../../services/createUserServices');
/** @type {import('express').RequestHandler} */

const create = async (req, res) => {
  const { name, email, password } = req.body;
  // chamar a funçõ da service pra lhe dr com essa galera 
   const user = await createUserServices.createUserRules(name, email, password);
  // se algo der errado manda a res.DeuRuim 
   res.status(201).json(user);
};

module.exports = { create };