const debug = require('debug')('app:model:user');
const pool = require('../libs/db');
const encryptPassword = require('../libs/secret').encryptPassword;

const schema = '"Member"';
const table = '"Users"'
const dbTable = schema + '.' + table;

class UserModel {

  async login (username, password) {
    password = encryptPassword(password, username);

    const res = await pool.query('SELECT name, username from ' + dbTable + ' where username = $1 and password = $2', [username, password]);

    debug('login %o', res);

    if (res.rowCount <= 0) {
      throw 'login fail';
    } else {
      return res;
    }

  }

  async register (data) {
    let user = [data.name, data.username, encryptPassword(data.password, data.username)];
    const res = await pool.query('INSERT INTO ' + dbTable + ' (name, username, password) VALUES ($1, $2, $3 ) RETURNING username,id;', user);

    debug('register %o', res);

    return res;
  }

  async edit (data) {
    let res, sets = [data.id, data.name];

    if (data.password !== '') {
      sets.push(encryptPassword(data.password, data.username));
    }

    if (data.password) {
      res = await pool.query('UPDATE ' + dbTable + ' SET (name, password) = ($2, $3) WHERE id = $1', sets);
    } else {
      res = await pool.query('UPDATE ' + dbTable + ' SET (name) = ($2) WHERE id = $1', sets);
    }

    debug('edit %o', res);
    
    if (res.rowCount <= 0) {
      throw 'login fail';
    } else {
      return res;
    }
  }

  async delete (data) {

    let id = data.id;
    let username = data.username;
    let column = (id === undefined) ? 'username' : 'id';

    const res = await pool.query('DELETE from ' + dbTable + ' where ' + column + ' = $1 RETURNING id, name, username', [(id || username)]);

    debug('delete %o', res);

    return res;
  }

  async get (id) {

    let res;

    if (id === undefined) {
      res = await pool.query('SELECT id, name, username from ' + dbTable + ' ORDER BY id ASC')
    } else {
      res = await pool.query('SELECT id, name, username from ' + dbTable + ' where id = $1 ORDER BY id ASC', [id]);
    }

    debug('get %o', res);

    return res;
    
  }
}

module.exports = new UserModel();