const jwt = require('jsonwebtoken');
const userModel = require('../../model/user/userModel');

const secret = 'xaolinMatadorDePorco';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const ALL_FIELDS = {
  status: 401,
  message: 'All fields must be filled',
};

const LOGIN_ERROR = {
  status: 401,
  message: 'Incorrect username or password',
};

const validateCredentials = (email, password) => {
 if (!email || !password) return true;
};

const login = async (email, password) => {
 if (validateCredentials(email, password)) return ALL_FIELDS;
 const result = await userModel.findEmail(email);

 if (!result) return LOGIN_ERROR;

 if (password !== result.password) return LOGIN_ERROR;
 const token = jwt.sign({ 
   _id: result.id,
    email: result.email, 
    role: result.role, 
  }, secret, jwtConfig);
 return { token };
};

module.exports = { login };