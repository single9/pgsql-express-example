const database = require('../configs.json').database;
const { Pool } = require('pg');

module.exports = new Pool(database);