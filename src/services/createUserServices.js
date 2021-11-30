const createUserModel = require('../model/user/createUserModel');
// objetos de erro: 
// regex obtido pelo aluno lucas A. santos
const regExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const INVÁLID_ENTRIES = {
  status: 400,
  message: 'Invalid entries. Try again.', 
};

const EMAIL_ALREADY_REGISTERED = {
  status: 409,
  message: 'Email already registered',
};

// funçoes de verificação
const entriesValidation = (name, email, password) => {
 if (!name || !email || !password) return true;
};

const findEmail = async (email) => {
  const emailExist = await createUserModel.findEmail(email);
  if (emailExist !== null) return true;
};

const responseFilter = (createdUser) => {
  const { name, email, role } = createdUser;
  const { _id } = createdUser;
  const newObject = { user: {
    name, email, role, _id,
  } };
  return newObject;
};

const validEmail = (email) => regExp.test(email);

const createUserRules = async (name, email, password) => {
  if (entriesValidation(name, email, password)) return INVÁLID_ENTRIES;
  if (!validEmail(email)) return INVÁLID_ENTRIES; 
  const emailExists = await findEmail(email); 
  if (emailExists) return EMAIL_ALREADY_REGISTERED;

 const createUserInDatabase = await createUserModel.createUser(name, email, password);
 const responseFiltred = responseFilter(createUserInDatabase);
  return responseFiltred;
};
  module.exports = { createUserRules };