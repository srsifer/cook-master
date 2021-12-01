const connection = require('../connection');

const createUser = async (name, email, password) => {
  const db = await connection();
  const inserted = await db
  .collection('users')
  .insertOne({ name, email, password, role: 'user' });
  return inserted.ops[0];
};

const findEmail = async (email) => {
  const db = await connection();
  const emailexist = await db
  .collection('users').findOne({ email });
  return emailexist;
};

module.exports = { 
  createUser,
  findEmail,
};