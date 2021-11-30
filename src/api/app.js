const express = require('express');
const createUser = require('../controllers/users/createUser');

const app = express();
app.use(express.json());
app.post('/users', createUser.create);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
