const { MongoClient } = require('mongodb');
require('dotenv').config();

 // const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager'; 
 const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/Cookmaster`;
const DB_NAME = 'Cookmaster';

const connection = () => MongoClient
  .connect(MONGO_DB_URL, {
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit();
  });

module.exports = connection;