const Router = require('express').Router();
const index = require('../controllers/index.js');

Router.get('/', index);

module.exports = Router;