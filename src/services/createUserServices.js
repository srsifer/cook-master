const createUserModel = require('../model/user/createUserModel');

const responseFilter = (createdUser) => {
  const { user: { name, email, role } } = createdUser;
  const { _id } = createdUser;
  const newObject = { user: {
    name, email, role, _id,
  } };
  return newObject;
};

const createUserRules = async (name, email, password) => {
 // chama a função pra escrever o meliante no banco 

 const createUserInDatabase = await createUserModel.createUser(name, email, password);
 const responseFiltred = responseFilter(createUserInDatabase);
 console.log(responseFiltred);
  return responseFiltred;
};
  module.exports = { createUserRules };