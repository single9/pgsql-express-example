const Router = require('express').Router();
const user = require('../controllers/user.js');

Router.post('/login', user.login)
      .post('/register', user.register)
      .post('/delete', user.delete)
      .post('/edit', user.edit)
      .get('/detail/:id', user.detail)
      .get('/logout', user.logout);

module.exports = Router;