const connection = require('../connection');

const createUser = async (name, email, password) => {
  const db = await connection();
  const inserted = await db
  .collection('users')
  .insertOne({ user: { name, email, password, role: 'user' } });
  return inserted.ops[0];
};

module.exports = { createUser };